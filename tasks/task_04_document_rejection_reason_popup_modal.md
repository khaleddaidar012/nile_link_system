# Task 04 — Document Rejection Reason Badging & Interactive Rejection Popup Modal

## Overview

Provide staff members with structured document rejection controls, allowing them to select preset rejection reasons and record reviewer audit notes. On the customer portal, rejected documents feature an interactive alert badge button. Clicking the badge opens a dedicated rejection popup modal (`RejectionReasonModal`) displaying the precise rejection explanation, audit notes, and a direct re-upload action.

## Requirements

- **REQ-004**: `4- او ارفض مع رسالة تظره ك ايقونه لما العميل يضغط عليها تتحطع بوبب` (Or reject the document with a rejection message reason that appears as an icon in the customer portal; when the customer clicks the icon, a popup modal appears with the rejection explanation).

## Current Implementation

- **Staff Rejection Flow**: `components/admin/review/DocumentReviewModal.tsx`
- **Rejection API**: `POST /api/admin/documents/[id]/verify`
- **Customer Rejection Popup Modal**: `components/portal/documents/RejectionReasonModal.tsx`
- **Customer Document Table**: `components/portal/documents/DocumentTable.tsx`

## Files / Modules Affected

- `components/admin/review/DocumentReviewModal.tsx`
- `app/api/admin/documents/[id]/verify/route.ts`
- `components/portal/documents/RejectionReasonModal.tsx`
- `components/portal/documents/DocumentTable.tsx`
- `lib/models/Document.ts`

## Data / Architecture Changes

- Extend `POST /api/admin/documents/[id]/verify` to process `status === "rejected"`, `rejectionReason`, and `reviewNotes`.
- Store `rejectionReason` and `reviewNotes` on the document document in MongoDB.
- Dispatch an in-app notification to the customer account explaining document rejection.

## UI / UX Changes

- **Staff Rejection Inputs**:
  - Red "Reject Document" decision selector.
  - Dropdown menu of preset reasons (e.g. "Illegible or Low Quality Copy", "Missing Official Stamp", "Expired Copy").
  - Textarea for reviewer feedback and audit notes.
- **Customer Portal Rejection Badging & Popup**:
  - Interactive red alert badge on rejected rows in `DocumentTable.tsx`: `AlertCircle` icon + "سبب الرفض: [السبب] (انقر للتفاصيل)".
  - Clicking badge opens `<RejectionReasonModal />` popup with:
    - High-visibility red alert header.
    - Official rejection reason statement.
    - Reviewer audit notes box.
    - Direct "إعادة رفع مستند جديد" (Re-upload Document) action button.

## Implementation Plan

1. Ensure `DocumentReviewModal.tsx` captures rejection reason and reviewer notes.
2. Submit rejection payload to `POST /api/admin/documents/[id]/verify`.
3. Create `RejectionReasonModal.tsx` with Framer Motion modal overlay.
4. Integrate rejection badge button in `DocumentTable.tsx` that opens `RejectionReasonModal`.

## Small Tasks

- [x] Add rejection reason selector and review notes textarea in `DocumentReviewModal.tsx`.
- [x] Connect `POST /api/admin/documents/[id]/verify` endpoint for rejected documents.
- [x] Create `RejectionReasonModal.tsx` component.
- [x] Add interactive red rejection alert badge to rejected rows in `DocumentTable.tsx`.
- [x] Connect badge click to open `RejectionReasonModal`.
- [x] Add direct "Renew / Re-upload" button inside rejection modal.
- [x] Test rejection flow end-to-end (Staff reject -> Customer clicks badge -> Modal opens).

## Edge Cases

- Document rejected without optional reviewer notes (Displays preset rejection reason cleanly).
- Customer clicks renew from rejection modal (Closes modal and opens document upload dropzone).
- Rejection reason in Arabic and English (Supports full bilingual i18n).

## Testing Checklist

- [x] Staff Rejection: Staff selects "Reject", chooses reason, clicks Save -> DB updates status to `"rejected"`.
- [x] Alert Badge: Customer views document table -> Red alert badge displays below rejected document name.
- [x] Popup Modal: Customer clicks alert badge -> `RejectionReasonModal` pops up displaying reason & notes.
- [x] Re-upload Trigger: Customer clicks "إعادة رفع" -> Upload area opens for document renewal.

## Acceptance Criteria

- Staff can reject documents with preset rejection reasons and notes.
- Rejected documents on the customer portal display an interactive alert badge.
- Clicking the badge pops up a modal displaying the exact rejection explanation and re-upload option.

## Dependencies

- Task 01 (Staff Customer 360 Workspace).

## AI_MAP Impact

- `API_INVENTORY.md`
- `TEST_GUIDE.md`
