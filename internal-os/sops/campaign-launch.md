# Campaign Launch SOP

## Overview
Checklist and process for launching email and SMS campaigns without errors.

## Owner
**Primary:** Cathy Ang (execution)
**Oversight:** Emma Hughes (approval for strategic campaigns)

## Trigger
- Scheduled campaign on content calendar
- Client requests ad-hoc campaign
- Promotional event (sale, holiday, product launch)

---

## Campaign Types

| Type | Approval Needed | Lead Time |
|------|-----------------|-----------|
| Regular newsletter | Cathy self-approve | 24 hours |
| Promotional/Sale | Emma review | 48 hours |
| New product launch | Emma + Client approval | 72 hours |
| SMS campaign | Emma review | 48 hours |
| A/B test | Emma review | 48 hours |

---

## Pre-Launch Checklist

### Content & Copy
- [ ] Subject line finalized
- [ ] Preview text written
- [ ] Body copy proofread (no typos!)
- [ ] CTAs are clear and compelling
- [ ] Tone matches brand voice
- [ ] Legal compliance (unsubscribe link present, physical address)

### Design & Layout
- [ ] Template matches brand guidelines
- [ ] Images are high quality and properly sized
- [ ] Alt text on all images
- [ ] Mobile responsive (check mobile preview!)
- [ ] Dark mode tested
- [ ] Buttons are properly styled

### Links & Tracking
- [ ] All links work (click every single one!)
- [ ] Links go to correct pages
- [ ] UTM parameters added (if required)
- [ ] No broken images
- [ ] Discount codes work (if applicable)

### Audience & Segmentation
- [ ] Correct segment selected
- [ ] Exclusions applied (recent purchasers, suppressions, etc.)
- [ ] List size makes sense (not too big, not too small)
- [ ] Smart sending enabled (if appropriate)

### Timing & Scheduling
- [ ] Send time is optimal (check client's timezone!)
- [ ] Not conflicting with other sends
- [ ] Date is correct (double-check!)
- [ ] Time zone is correct

---

## Launch Process

### Step 1: Build the Campaign (2-24 hours before)

1. Create campaign in Klaviyo
2. Add all content and design
3. Complete all checklist items above
4. Save as draft

### Step 2: Internal Review (if required)

**For campaigns needing Emma review:**
- [ ] Slack Emma with campaign link
- [ ] Include: Client name, campaign purpose, send time
- [ ] Wait for approval before scheduling

**Review turnaround:** 4 hours (same business day if sent before 2pm)

### Step 3: Send Test Emails

- [ ] Send test to yourself
- [ ] Send test to Emma (for reviewed campaigns)
- [ ] Send test to client (if they want preview)

**Test email checklist:**
- [ ] Subject line renders correctly
- [ ] Preview text shows properly
- [ ] All personalization works (first name, etc.)
- [ ] Images load
- [ ] Links work
- [ ] Mobile view looks good

### Step 4: Client Approval (if required)

Some clients want to approve campaigns before send:
- [ ] Send preview link or test email
- [ ] Document approval in Slack
- [ ] Note any requested changes

### Step 5: Schedule the Campaign

- [ ] Double-check segment one more time
- [ ] Verify send time and date
- [ ] Schedule (don't send immediately unless urgent)
- [ ] Confirm "Scheduled" status in Klaviyo

### Step 6: Post-Schedule Verification

- [ ] Screenshot the scheduled campaign
- [ ] Post in client Slack: "Campaign scheduled for [time] to [X] subscribers"
- [ ] Add to ClickUp as completed task

---

## Post-Launch Process

### Immediately After Send (within 1 hour)
- [ ] Check Klaviyo for any sending errors
- [ ] Verify emails are being delivered
- [ ] Monitor for any client/customer complaints

### 24 Hours After Send
- [ ] Check open rate (is it normal?)
- [ ] Check click rate
- [ ] Note any unsubscribe spikes
- [ ] Log performance in tracker (if you track individual campaigns)

### Report in Monthly Report
- Campaign performance rolls into monthly reporting

---

## Emergency: Wrong Campaign Sent

If you accidentally send the wrong campaign or spot an error:

1. **Don't panic**
2. **Can you cancel?** (If still sending, cancel immediately in Klaviyo)
3. **Assess the damage:**
   - Wrong audience? → May need correction email
   - Typo/broken link? → Assess severity
   - Wrong discount code? → Honor it or send correction
4. **Notify Emma immediately** (Slack DM)
5. **Draft correction email if needed**
6. **Communicate with client** (Emma or Joe handles)
7. **Document what happened** for learning

---

## SMS Campaign Additional Checklist

- [ ] Message is under 160 characters (or intentionally longer)
- [ ] Includes opt-out language if required
- [ ] Link is shortened
- [ ] Complies with TCPA/carrier guidelines
- [ ] Not sending during quiet hours (before 9am or after 9pm recipient time)
- [ ] Test SMS received on actual phone

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Low open rate | Check subject line, send time, segment engagement |
| Links broken after send | Send correction email with working link |
| Personalization shows blank | Check merge tag, ensure fallback is set |
| Sent to wrong segment | Assess impact, may need apology email |
| Client wants last-minute changes | Push back on timeline or delay send |
| Spam complaints spike | Review content, check list source, may need list cleaning |

---

## Campaign Launch Time Estimates

| Campaign Type | Build Time | Review Time | Total |
|---------------|------------|-------------|-------|
| Simple newsletter | 30 min | 15 min | 45 min |
| Promotional email | 45 min | 30 min | 75 min |
| Complex campaign (multi-email) | 2 hours | 1 hour | 3 hours |
| SMS campaign | 15 min | 15 min | 30 min |

---

## Related SOPs
- [Monthly Reporting](./monthly-reporting.md)
- [Flow Audit](./flow-audit.md)
