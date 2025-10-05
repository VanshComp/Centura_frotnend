# Back Navigation System - Implementation Documentation

## Overview

This implementation provides a comprehensive, predictable back navigation system across the entire Centura platform, following Apple-inspired UX patterns.

## Core Components

### 1. `useBackNavigation` Hook
Location: `src/hooks/use-back-navigation.tsx`

**Features:**
- Intelligent hierarchical fallback when browser history is empty
- Unsaved changes detection and confirmation
- Dynamic back target labels
- Deep link support

**Usage:**
```tsx
const { handleBack, backLabel, canGoBack } = useBackNavigation({
  isDirty: hasUnsavedChanges,
  onBeforeNavigate: async () => {
    // Custom pre-navigation logic
    return true; // Return false to cancel
  }
});
```

### 2. `BackButton` Component
Location: `src/components/BackButton.tsx`

**Features:**
- Consistent placement and styling
- Tooltip showing destination
- Support for unsaved changes warnings
- Accessibility with ARIA labels

**Usage:**
```tsx
<BackButton 
  isDirty={hasUnsavedChanges}
  onBeforeNavigate={customHandler}
  showLabel={true} // Optional
/>
```

### 3. `useUnsavedGuard` Hook
Location: `src/hooks/use-unsaved-guard.tsx`

**Features:**
- Blocks navigation when there are unsaved changes
- Browser back/forward button protection
- Browser reload protection (beforeunload)
- React Router integration

**Usage:**
```tsx
const [isDirty, setIsDirty] = useState(false);
useUnsavedGuard({ 
  when: isDirty,
  message: "Custom warning message"  // Optional
});
```

### 4. `Breadcrumbs` Component
Location: `src/components/Breadcrumbs.tsx`

**Features:**
- Auto-generation from current route
- Manual breadcrumb override support
- Click-to-navigate on segments
- Home icon for root level

**Usage:**
```tsx
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Current Project', href: '/projects/1' }
]} />
```

### 5. `useKeyboardBack` Hook
Location: `src/hooks/use-keyboard-back.tsx`

**Features:**
- Keyboard shortcuts: `Alt + ←` (Windows/Linux) or `⌘ + [` (Mac)
- Respects unsaved changes
- Can be disabled when needed

**Usage:**
```tsx
useKeyboardBack({ 
  enabled: true,
  isDirty: hasUnsavedChanges
});
```

## Hierarchical Navigation Map

The system follows this parent-child hierarchy for fallback navigation:

```
Landing (/)
  ├── Projects (/projects)
  │   ├── Project Detail (/projects/:id)
  │   │   ├── Asset (/projects/:projectId/assets/:assetId)
  │   │   │   └── Thread (/projects/:projectId/assets/:assetId/threads/:tid)
  │   │   │       └── Iteration (/projects/:projectId/assets/:assetId/threads/:tid/iterations/:iid)
  │   │   └── New Asset (/assets/new)
  │   └── New Project (/projects/new)
  ├── Assets Library (/assets)
  ├── Queue (/queue)
  ├── Compliance Inbox (/compliance)
  ├── Rules (/rules)
  ├── Reports (/reports)
  └── Settings (/settings)
```

## Page-by-Page Implementation Status

| Page | BackButton | Breadcrumbs | Unsaved Guard | Keyboard | Status |
|------|-----------|-------------|---------------|----------|--------|
| Dashboard | ✅ | N/A | N/A | ✅ | Complete |
| Projects | ✅ | N/A | N/A | ✅ | Complete |
| Project Detail | ✅ | ✅ | N/A | ✅ | Complete |
| Assets Library | ✅ | N/A | N/A | ✅ | Complete |
| Asset Detail | ✅ | ✅ | ✅ | ✅ | Complete |
| Thread Workspace | ✅ | ✅ | ✅ | ✅ | **Complete** |
| Iteration | ✅ | ✅ | ✅ | ✅ | **Complete** |
| New Project | ✅ | N/A | ✅ | ✅ | Complete |
| New Asset | ✅ | N/A | ✅ | ✅ | Complete |
| Queue | ✅ | N/A | N/A | ✅ | Complete |
| Compliance Inbox | ✅ | N/A | N/A | ✅ | Complete |
| Rules | ✅ | N/A | N/A | ✅ | Complete |
| Reports | ✅ | N/A | N/A | ✅ | Complete |
| Settings | ✅ | N/A | N/A | ✅ | Complete |

## New Components

### 6. `ThreadSidebar` Component
Location: `src/components/ThreadSidebar.tsx`

**Features:**
- Collapsible left sidebar with thread/iteration tree
- Visual hierarchy showing threads and their iterations
- Status icons for each iteration (approved, in-review, etc.)
- Asset type icons (VIDEO, IMAGE, TEXT)
- Branch indicators for forked iterations
- Quick navigation between threads and iterations

**Usage:**
```tsx
<ThreadSidebar 
  collapsed={sidebarCollapsed}
  onCollapse={setSidebarCollapsed}
  currentThreadId="1"
  currentIterationId="3"
  iterations={mockIterations}
/>
```

### 7. `TaskBar` Component  
Location: `src/components/TaskBar.tsx`

**Features:**
- Drop-down task bar showing active compliance checks
- Collapsed view: chips showing running checks
- Expanded view: detailed panel with progress, stepper, and actions
- "Open Thread" button to navigate to thread workspace
- Dismissible task chips
- Progress indicators for running checks

**Usage:**
```tsx
<TaskBar 
  tasks={[{
    id: "check-1",
    threadTitle: "Hero Reel 15s",
    iteration: "v3",
    status: "running",
    progress: 45
  }]}
/>
```

## Behavior Specifications

### 1. Browser History Navigation
- **Has History**: Clicking back navigates to previous page in history
- **No History**: Falls back to hierarchical parent (see map above)
- **Deep Links**: Automatically determines parent from URL structure

### 2. Unsaved Changes
When `isDirty` is true:
1. Browser back/forward → Shows confirmation dialog
2. Browser reload → Shows native "Leave site?" dialog  
3. Back button click → Shows confirmation dialog
4. Navigation via other means → Blocked with confirmation

### 3. Modal/Drawer Behavior
The Task Bar implements this behavior:

Priority order for back action:
1. Close task panel (if expanded)
2. Close topmost modal (if any)
3. Close topmost drawer (if any)  
4. Navigate to previous page

**Task Bar Implementation:**
- Collapsed state shows chips for active checks
- Back closes the expanded panel first
- Subsequent back navigates per normal hierarchy
- "Open Thread" button navigates to thread workspace and auto-closes panel

### 4. Keyboard Shortcuts
- **Windows/Linux**: `Alt + ←`
- **Mac**: `⌘ + [`
- Works identically to clicking the back button
- Respects all same guards and confirmations

## Edge Cases Handled

### 1. Permission Errors
If user loses access to back target:
- Navigates to nearest accessible parent
- Shows toast notification about the issue

### 2. Deleted Resources
If back target no longer exists:
- Navigates to parent level
- Shows inline notification

### 3. Concurrent Edits
- Lock release on navigation
- Unsaved changes warning shown first

### 4. Direct URL Access
- Deep links work correctly
- Hierarchical parent computed from URL
- No history requirement

## Accessibility

### ARIA Labels
- Back buttons have `aria-label` with destination
- Tooltips provide additional context
- Keyboard navigation fully supported

### Focus Management
- Back button is first in focus order
- Breadcrumbs follow back button
- Page title comes after navigation elements

### Screen Readers
- Clear announcements of navigation actions
- State changes (dirty/clean) announced
- Confirmation dialogs properly labeled

## Testing Checklist

### Manual Testing
- [ ] Click back button on each page
- [ ] Use keyboard shortcuts on each page
- [ ] Test with unsaved changes on forms
- [ ] Test browser back/forward buttons
- [ ] Test breadcrumb navigation
- [ ] Test deep link entry points
- [ ] Test with no browser history

### Automated Testing
- [ ] Unit tests for navigation hooks
- [ ] Integration tests for routing
- [ ] E2E tests for full workflows
- [ ] Accessibility audit

## Mobile Considerations
*(Ready for Phase 2)*

### Gestures
- Left-edge swipe → Back navigation
- Hardware back button → Same as back button
- Touch targets minimum 44×44px

### Layout
- Back button always visible in sticky header
- Breadcrumbs adapt to available width
- Touch-friendly spacing

## Future Enhancements

### Phase 2: Advanced Features
1. **Quick Jump Dropdown**: Last 5 pages in history
2. **Recent Items**: Last 10 accessed threads/iterations  
3. **Right Sidebar**: Comments, subtasks, history panels
4. **Undo Toast**: For non-critical local actions
5. **Compare Mode**: Side-by-side iteration comparison

### Phase 3: Analytics
1. Log back navigation patterns
2. Track confirmation dialog responses
3. Identify problematic navigation flows
4. A/B test navigation improvements

## Performance Considerations

### Optimization
- Navigation state cached in memory
- Minimal re-renders on route changes
- Event listeners cleaned up properly
- No memory leaks from history tracking

### Bundle Size
- All hooks are tree-shakeable
- Components lazy-loadable
- No heavy dependencies added

## Known Limitations

1. **Right Sidebar Panels**: Comments/history panels not yet implemented (Phase 2)
2. **Compare Mode**: Iteration comparison view not yet implemented (Phase 2)
3. **Mobile Gestures**: Not yet implemented (Phase 2)
4. **Tab State Persistence**: URL query params needed
5. **Analytics**: Event tracking not yet added
6. **Real Backend**: Currently using mock data, needs Supabase integration

## Migration Guide

### For Existing Pages

**Before:**
```tsx
<Link to="/projects">
  <Button variant="ghost">
    <ArrowLeft className="w-4 h-4" />
    Back
  </Button>
</Link>
```

**After:**
```tsx
import { BackButton } from "@/components/BackButton";

<BackButton />
```

### For Forms with Unsaved Changes

**Add:**
```tsx
import { useUnsavedGuard } from "@/hooks/use-unsaved-guard";

const [isDirty, setIsDirty] = useState(false);
useUnsavedGuard({ when: isDirty });

<BackButton isDirty={isDirty} />
```

## Support & Troubleshooting

### Common Issues

**Issue**: Back button navigates to wrong page
**Solution**: Check hierarchical map matches your route structure

**Issue**: Unsaved changes dialog not showing
**Solution**: Ensure `useUnsavedGuard` hook is called and `isDirty` is true

**Issue**: Keyboard shortcuts not working
**Solution**: Check for event listener conflicts, ensure hook is called

**Issue**: Breadcrumbs showing IDs instead of names
**Solution**: Pass custom items prop with friendly labels

## Conclusion

This implementation provides a robust, accessible, and user-friendly back navigation system that works consistently across the entire application. It follows modern UX patterns, handles edge cases gracefully, and is ready for future enhancements.

For questions or feature requests, refer to the PRD addendum or contact the development team.
