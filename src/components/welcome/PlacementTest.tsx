"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  IconCheck,
  IconX,
  IconTrophy,
  IconChevronRight,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  placementQuestions,
  levelOrder,
  levelMapping,
  type LanguageLevel,
} from "@/lib/placement-test";
import { cn } from "@/lib/utils";

type PlacementTestProps = {
  onComplete: (level: string) => void;
};

type AnswerState = "idle" | "correct" | "incorrect";

export const PlacementTest: React.FC<PlacementTestProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [levelResults, setLevelResults] = useState<
    Record<LanguageLevel, { correct: number; total: number }>
  >({
    "A0-A1": { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
    B2: { correct: 0, total: 0 },
    C1: { correct: 0, total: 0 },
  });
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [finalLevel, setFinalLevel] = useState<string>("A0");

  const currentQuestion = placementQuestions[currentQuestionIndex];
  const currentLevel = levelOrder[currentLevelIndex];
  const totalQuestionsInLevel = 5;
  const passThreshold = 4; // Need 4 out of 5 to pass

  // Calculate progress
  const levelProgress =
    (levelResults[currentLevel].total / totalQuestionsInLevel) * 100;

  const handleAnswerSelect = (answerId: string) => {
    if (answerState !== "idle") return;
    setSelectedAnswer(answerId);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnswerState(isCorrect ? "correct" : "incorrect");

    // Update results
    const newResults = { ...levelResults };
    newResults[currentLevel].total += 1;
    if (isCorrect) {
      newResults[currentLevel].correct += 1;
    }
    setLevelResults(newResults);

    // Check if level is complete
    if (newResults[currentLevel].total === totalQuestionsInLevel) {
      // Wait a bit before processing level completion
      setTimeout(() => {
        processLevelCompletion(newResults[currentLevel]);
      }, 1500);
    } else {
      // Move to next question after a delay
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setAnswerState("idle");
      }, 1500);
    }
  };

  const processLevelCompletion = (result: {
    correct: number;
    total: number;
  }) => {
    const passed = result.correct >= passThreshold;

    if (passed) {
      // Check if there's a next level
      if (currentLevelIndex < levelOrder.length - 1) {
        // Move to next level
        setTimeout(() => {
          setCurrentLevelIndex(currentLevelIndex + 1);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setAnswerState("idle");
        }, 2000);
      } else {
        // Completed all levels
        const assignedLevel = levelMapping[currentLevel];
        setFinalLevel(assignedLevel);
        setIsTestComplete(true);
      }
    } else {
      // Failed this level - assign previous level
      let assignedLevel = "A0";
      if (currentLevelIndex > 0) {
        assignedLevel = levelMapping[levelOrder[currentLevelIndex - 1]];
      }
      setFinalLevel(assignedLevel);
      setIsTestComplete(true);
    }
  };

  const handleFinish = () => {
    onComplete(finalLevel);
  };

  if (isTestComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <IconTrophy className="w-24 h-24 mx-auto text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold">Test Completed!</h2>
          <p className="text-lg text-muted-foreground">
            Your language level has been determined
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{finalLevel}</div>
            <p className="text-muted-foreground">
              Based on your answers, we've placed you at level {finalLevel}
            </p>

            <div className="pt-4 space-y-2 text-sm text-left">
              {Object.entries(levelResults)
                .filter(([_, result]) => result.total > 0)
                .map(([level, result]) => (
                  <div
                    key={level}
                    className="flex justify-between items-center p-2 bg-muted rounded"
                  >
                    <span className="font-medium">{level}</span>
                    <span
                      className={cn(
                        result.correct >= passThreshold
                          ? "text-green-600"
                          : "text-orange-600"
                      )}
                    >
                      {result.correct}/{result.total} correct
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleFinish} size="lg" className="gap-2">
            Continue
            <IconChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Level Progress Header */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Level: {currentLevel} ({levelResults[currentLevel].total + 1}/
            {totalQuestionsInLevel})
          </span>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {placementQuestions.length}
          </span>
        </div>
        <Progress value={levelProgress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-8 space-y-6">
              {/* Question */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold whitespace-pre-line">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectAnswer =
                    option.id === currentQuestion.correctAnswer;
                  const showResult = answerState !== "idle";

                  let buttonStyle = "";
                  let icon = null;

                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonStyle =
                        "border-green-500 bg-green-50 dark:bg-green-950/20";
                      if (isSelected) {
                        icon = <IconCheck className="w-5 h-5 text-green-600" />;
                      }
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonStyle = "border-red-500 bg-red-50 dark:bg-red-950/20";
                      icon = <IconX className="w-5 h-5 text-red-600" />;
                    }
                  } else if (isSelected) {
                    buttonStyle = "border-primary bg-primary/5 ring-2 ring-primary/20";
                  }

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      disabled={answerState !== "idle"}
                      whileHover={{ scale: answerState === "idle" ? 1.02 : 1 }}
                      whileTap={{ scale: answerState === "idle" ? 0.98 : 1 }}
                      className={cn(
                        "w-full p-4 text-left border-2 rounded-xl transition-all",
                        "hover:shadow-md disabled:cursor-not-allowed",
                        "flex items-center justify-between",
                        buttonStyle
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full",
                            "border-2 font-semibold text-sm",
                            isSelected && answerState === "idle"
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          )}
                        >
                          {option.id.toUpperCase()}
                        </span>
                        <span className="font-medium">{option.text}</span>
                      </div>
                      {icon}
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              <AnimatePresence>
                {answerState !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "p-4 rounded-lg text-center font-medium",
                      answerState === "correct"
                        ? "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400"
                        : "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400"
                    )}
                  >
                    {answerState === "correct"
                      ? "Correct! Well done!"
                      : "Not quite right, but keep going!"}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Check Answer Button */}
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer || answerState !== "idle"}
                className="w-full"
                size="lg"
              >
                Check Answer
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};