# Scheduling Functionality Test Checklist

## Regular Sessions

### Display
- [X] Regular sessions show "Regular" label (not "Individual") in /calendar "My Bookings" view
- [X] Regular sessions show "Regular" label in dashboard calendar
- [x] Regular sessions display with correct color (red-400) in calendar
- [x] Regular sessions show "Weekly recurring" note in event details
- [x] Regular sessions show correct tutor name
- [x] Regular sessions show correct time and duration
- [x] Regular sessions show correct location

### Blocking Available Slots
- [x] Time slots occupied by regular sessions do NOT appear as available
- [x] Test with Student A having a regular session - Student B should NOT see that slot as available
- [x] Verify blocked slots work correctly across multiple weeks (4-week window)
- [x] Verify blocked slots work for different tutors independently

### Event Sheet (clicking on regular session)
- [x] Shows "Regular" status badge
- [x] Shows "Weekly recurring" indicator
- [x] Does NOT show "Book Session" button
- [x] Shows "Contact tutor" button
- [x] Shows "Cancel" button (when >24 hours away)
- [x] Cancel button is disabled when <24 hours away
- [ ] Shows "Cannot cancel sessions within 24 hours" message when applicable

### Cancellation
- [ ] Can cancel regular session occurrence >24 hours in advance
- [ ] Cancellation dialog opens correctly
- [ ] Reason field is optional
- [ ] After cancellation, the specific occurrence disappears
- [ ] Other occurrences of the same regular schedule remain
- [ ] Tutor receives cancellation email notification

---

## Individual Sessions

### Display
- [ ] Individual sessions show "Individual" label in /calendar "My Bookings" view
- [ ] Individual sessions show "Personal Session" label in dashboard calendar
- [ ] Individual sessions display with correct color (indigo-600 for booked)
- [ ] Individual sessions show correct tutor name, time, duration, location

### Booking Flow
- [ ] Available slots show with tutor's color
- [ ] Clicking available slot opens event sheet
- [ ] Event sheet shows "Available" status badge
- [ ] "Book Session" button is visible for available slots
- [ ] Booking creates the session successfully
- [ ] After booking, slot no longer appears as available
- [ ] Booked session appears in "My Bookings" view
- [ ] Confirmation toast appears after booking

### Event Sheet (clicking on booked individual session)
- [ ] Shows "Booked" status badge
- [ ] Shows "Contact tutor" button
- [ ] Shows "Cancel" button
- [ ] Cancellation works correctly

---

## Calendar Views

### /calendar Page (Main Calendar)
- [ ] Default view shows available slots (not my bookings)
- [ ] "My Bookings" toggle switches to show booked sessions + regular sessions
- [ ] Tutor filter works correctly in available slots view
- [ ] Tutor filter is hidden/disabled in "My Bookings" view
- [ ] Month/Week/Day/2-day/3-day views all work
- [ ] Navigation (prev/next/today) works
- [ ] Weekend toggle works
- [ ] "No availability" overlay shows when tutor has no slots
- [ ] View preference persists in URL (?view=week, etc.)

### Dashboard Calendar
- [ ] Shows all event types: Language Club, Personal Sessions, Regular Sessions
- [ ] Clicking a date opens the sheet with events for that day
- [ ] Events are color-coded correctly:
  - Language Club: purple
  - Personal Sessions: tutor color / pink
  - Regular Sessions: tutor color / green
- [ ] Dot indicators show on calendar days with events
- [ ] Summary cards show correct counts

---

## Language Club Events

### Display
- [ ] Language Club events show in dashboard calendar
- [ ] Shows correct theme, tutor, level, duration, location
- [ ] Shows "Language Club" badge

### Booking
- [ ] Booking dialog offers "Reserve Now" and "Pay Online" options
- [ ] Both booking flows work correctly
- [ ] Booked events appear in dashboard and calendar

### Management
- [ ] Reschedule button works for Language Club events
- [ ] Cancel button works for Language Club events
- [ ] Confirmation emails are sent

---

## Edge Cases

### Time/Date Handling
- [ ] Sessions display in correct timezone (Europe/Ljubljana)
- [ ] Past sessions do not appear in available slots
- [ ] Sessions within the next 4 weeks appear correctly
- [ ] Day of week calculation is correct (Monday = 1, Sunday = 0)

### Multiple Tutors
- [ ] Each tutor's schedule generates independently
- [ ] Regular sessions block only the specific tutor's slots
- [ ] Filtering by tutor shows only that tutor's available slots

### Concurrent Bookings
- [ ] Two users cannot book the same slot
- [ ] Slot disappears for all users after being booked

### Data Consistency
- [ ] Dashboard and /calendar show the same sessions
- [ ] Session counts in stats cards are accurate
- [ ] "Next event" card shows the correct upcoming event

---

## Translations

- [ ] "Individual" displays correctly in EN/SL/RU/IT
- [ ] "Regular" displays correctly in EN/SL/RU/IT
- [ ] "Group" displays correctly in EN/SL/RU/IT
- [ ] All calendar controls are translated
- [ ] Event sheet content is translated
- [ ] Cancel dialog content is translated

---

## Mobile/Responsive

- [ ] Calendar is usable on mobile devices
- [ ] Event sheet is accessible on mobile
- [ ] Touch interactions work correctly
- [ ] 2-day/3-day views are helpful for mobile

---

## Performance

- [ ] Calendar loads within reasonable time
- [ ] Switching views is responsive
- [ ] Large number of events doesn't cause lag
- [ ] Sidebar collapse/expand updates calendar size correctly

---

## Notes

_Use this section to document any issues found during testing:_

| Issue | Status | Notes |
|-------|--------|-------|
|       |        |       |

