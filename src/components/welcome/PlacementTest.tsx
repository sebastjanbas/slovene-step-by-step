"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
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

// localStorage key for placement test data
const PLACEMENT_TEST_KEY = "placement_test_state";

interface PlacementTestState {
  currentQuestionIndex: number;
  levelResults: Record<LanguageLevel, { correct: number; total: number }>;
  currentLevelIndex: number;
  isTestComplete: boolean;
  finalLevel: string;
  answeredQuestions: number[]; // Track which questions have been answered
}

// Utility function to clear the placement test state
export const clearPlacementTestState = () => {
  localStorage.removeItem(PLACEMENT_TEST_KEY);
};

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
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentQuestion = placementQuestions[currentQuestionIndex];
  const currentLevel = levelOrder[currentLevelIndex];
  const totalQuestionsInLevel = 5;
  const passThreshold = 4;

  const overallProgress = (currentQuestionIndex / placementQuestions.length) * 100;

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(PLACEMENT_TEST_KEY);
    if (savedState) {
      try {
        const parsedState: PlacementTestState = JSON.parse(savedState);
        setCurrentQuestionIndex(parsedState.currentQuestionIndex);
        setLevelResults(parsedState.levelResults);
        setCurrentLevelIndex(parsedState.currentLevelIndex);
        setIsTestComplete(parsedState.isTestComplete);
        setFinalLevel(parsedState.finalLevel);
        setAnsweredQuestions(parsedState.answeredQuestions);

        // If a test was already completed, auto-complete it again
        // if (parsedState.isTestComplete) {
        //   setTimeout(() => {
        //     onComplete(parsedState.finalLevel);
        //   }, 100);
        // }
      } catch (error) {
        console.error("Failed to load placement test state:", error);
      }
    }
    setIsLoaded(true);
  }, [onComplete]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save on an initial load

    const stateToSave: PlacementTestState = {
      currentQuestionIndex,
      levelResults,
      currentLevelIndex,
      isTestComplete,
      finalLevel,
      answeredQuestions,
    };
    localStorage.setItem(PLACEMENT_TEST_KEY, JSON.stringify(stateToSave));
  }, [
    currentQuestionIndex,
    levelResults,
    currentLevelIndex,
    isTestComplete,
    finalLevel,
    answeredQuestions,
    isLoaded,
  ]);

  const processLevelCompletion = useCallback((result: {
    correct: number;
    total: number;
  }) => {
    const passed = result.correct >= passThreshold;

    if (passed) {
      if (currentLevelIndex < levelOrder.length - 1) {
        setTimeout(() => {
          setCurrentLevelIndex(currentLevelIndex + 1);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setAnswerState("idle");
        }, 2000);
      } else {
        const assignedLevel = levelMapping[currentLevel];
        setFinalLevel(assignedLevel);
        setIsTestComplete(true);
      }
    } else {
      let assignedLevel = "A0";
      if (currentLevelIndex > 0) {
        assignedLevel = levelMapping[levelOrder[currentLevelIndex - 1]];
      }
      setFinalLevel(assignedLevel);
      setIsTestComplete(true);
    }
  }, [passThreshold, currentLevelIndex, currentQuestionIndex, currentLevel]);

  const handleAnswerSelect = useCallback((answerId: string) => {
    if (answerState !== "idle") return;
    setSelectedAnswer(answerId);
  }, [answerState]);

  const handleCheckAnswer = useCallback(() => {
    if (!selectedAnswer) return;

    // Prevent re-answering already answered questions
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnswerState(isCorrect ? "correct" : "incorrect");

    const newResults = { ...levelResults };
    newResults[currentLevel].total += 1;
    if (isCorrect) {
      newResults[currentLevel].correct += 1;
    }
    setLevelResults(newResults);

    // Mark this question as answered
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    if (newResults[currentLevel].total === totalQuestionsInLevel) {
      setTimeout(() => {
        processLevelCompletion(newResults[currentLevel]);
      }, 1500);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setAnswerState("idle");
      }, 1500);
    }
  }, [selectedAnswer, answeredQuestions, currentQuestionIndex, currentQuestion.correctAnswer, levelResults, currentLevel, totalQuestionsInLevel, processLevelCompletion]);

  // Keyboard shortcuts for answer selection and confirmation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle keyboard events when in idle state and not completed
      if (answerState !== "idle" || isTestComplete) return;

      const key = event.key.toLowerCase();

      // Map number keys to letter options (1→a, 2→b, 3→c, 4→d)
      const numberToLetter: Record<string, string> = {
        "1": "a",
        "2": "b",
        "3": "c",
        "4": "d",
      };

      let optionId: string | null = null;

      // Handle letter keys for option selection (a, b, c, d)
      if (/^[a-d]$/.test(key)) {
        optionId = key;
      }
      // Handle number keys for option selection (1, 2, 3, 4)
      else if (/^[1-4]$/.test(event.key)) {
        optionId = numberToLetter[event.key];
      }

      // Select the option if it exists
      if (optionId) {
        const optionExists = currentQuestion.options.some(
          (option) => option.id === optionId
        );
        if (optionExists) {
          handleAnswerSelect(optionId);
        }
      }

      // Handle Enter key for answer confirmation
      if (event.key === "Enter" && selectedAnswer) {
        handleCheckAnswer();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [answerState, isTestComplete, selectedAnswer, currentQuestion, handleAnswerSelect, handleCheckAnswer]);

  const handleFinish = () => {
    onComplete(finalLevel);
  };

  // Completion Screen - Apple Minimal Style
  if (isTestComplete) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 py-8">
        {/* Trophy Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <IconTrophy className="w-6 h- text-primary" />
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md text-center space-y-6"
        >
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">Test Complete</h2>
            <p className="text-muted-foreground">
              Your language level has been determined
            </p>
          </div>

          {/* Level Badge */}
          <div className="py-8">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-b from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 mb-4">
              <span className="text-5xl font-semibold text-primary">
                {finalLevel}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your performance
            </p>
          </div>

          {/* Results Summary - Minimal */}
          <div className="space-y-2 text-left">
            {Object.entries(levelResults)
              .filter(([, result]) => result.total > 0)
              .map(([level, result]) => (
                <div
                  key={level}
                  className="flex items-center justify-between py-3 border-b border-border/40 last:border-0"
                >
                  <span className="text-sm font-medium text-foreground/70">{level}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {result.correct}/{result.total}
                    </span>
                    {result.correct >= passThreshold && (
                      <IconCheck className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleFinish}
            size="lg"
            className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            Continue
            <IconChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Test Question Screen
  return (
    <div className="flex flex-col h-full w-full">
      {/* Minimal Progress Header */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center gap-3">
          <span className="font-medium text-foreground">{currentLevel}</span>
          <span className="text-muted-foreground">
            {levelResults[currentLevel].total + 1} of {totalQuestionsInLevel}
          </span>
        </div>
        <span className="text-muted-foreground">
          {currentQuestionIndex + 1}/{placementQuestions.length}
        </span>
      </div>

      {/* Clean Progress Bar */}
      <div className="relative h-[2px] bg-black/5 dark:bg-white/10 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Question Content - Direct Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-8">
            {/* Question Text */}
            <div>
              <h3 className="text-2xl font-semibold leading-relaxed whitespace-pre-line text-foreground">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Options - Clean Style */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isCorrectAnswer = option.id === currentQuestion.correctAnswer;
                const showResult = answerState !== "idle";

                let buttonClasses = "border-border/50 hover:border-foreground/20 hover:bg-foreground/[0.02] dark:hover:bg-foreground/[0.05]";
                let icon = null;

                if (showResult) {
                  if (isCorrectAnswer) {
                    buttonClasses = "border-green-500/50 bg-green-50/50 dark:bg-green-950/20";
                    if (isSelected) {
                      icon = <IconCheck className="w-5 h-5 text-green-600 dark:text-green-500" />;
                    }
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClasses = "border-red-500/50 bg-red-50/50 dark:bg-red-950/20";
                    icon = <IconX className="w-5 h-5 text-red-600 dark:text-red-500" />;
                  }
                } else if (isSelected) {
                  buttonClasses = "border-primary bg-primary/5 dark:bg-primary/10";
                }

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={answerState !== "idle"}
                    whileHover={{ scale: answerState === "idle" ? 1.005 : 1 }}
                    whileTap={{ scale: answerState === "idle" ? 0.995 : 1 }}
                    className={cn(
                      "w-full p-4 text-left border rounded-xl transition-all duration-200",
                      "disabled:cursor-not-allowed flex items-center justify-between",
                      buttonClasses
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                          "text-sm font-medium transition-all",
                          isSelected && answerState === "idle"
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground/5 dark:bg-foreground/10 text-foreground/60"
                        )}
                      >
                        {option.id.toUpperCase()}
                      </span>
                      <span className="font-medium text-base">{option.text}</span>
                    </div>
                    {icon}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4 mt-8">
            {/* Feedback Message - Minimal */}
            <AnimatePresence>
              {answerState !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div
                    className={cn(
                      "px-4 py-3 rounded-lg text-center text-sm font-medium",
                      answerState === "correct"
                        ? "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400"
                        : "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400"
                    )}
                  >
                    {answerState === "correct"
                      ? "Correct!"
                      : "Keep going!"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Check Answer Button - Clean */}
            <Button
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer || answerState !== "idle"}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-40 shadow-sm"
            >
              Check Answer
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
