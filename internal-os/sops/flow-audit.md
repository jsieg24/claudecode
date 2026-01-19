# Flow Audit SOP

## Overview
Process for systematically reviewing and optimizing a client's existing Klaviyo flows.

## Owner
**Primary:** Emma Hughes (strategy, recommendations)
**Support:** Cathy Ang (data pulling, implementation)

## Trigger
- New client onboarding (initial audit)
- Quarterly optimization review
- Performance concerns identified
- Client requests flow review

---

## Core Flows to Audit

Every ecommerce client should have these flows. Audit each one:

| Priority | Flow | Purpose |
|----------|------|---------|
| 🔴 Critical | Welcome Series | Convert new subscribers |
| 🔴 Critical | Abandoned Cart | Recover lost revenue |
| 🔴 Critical | Browse Abandonment | Re-engage window shoppers |
| 🟡 Important | Post-Purchase | Build loyalty, encourage reviews |
| 🟡 Important | Winback | Re-engage lapsed customers |
| 🟢 Nice to Have | Sunset | Clean unengaged subscribers |
| 🟢 Nice to Have | Birthday/Anniversary | Personal touch |
| 🟢 Nice to Have | Back in Stock | Capture demand |
| 🟢 Nice to Have | Price Drop | Drive conversions |

---

## Audit Process

### Step 1: Document Current State

For each flow, capture:

**Flow Inventory Table**
| Flow Name | Status | # Emails | Trigger | Last Updated |
|-----------|--------|----------|---------|--------------|
| Welcome Series | Live | 4 | List signup | 6 months ago |
| Abandoned Cart | Live | 3 | Started checkout | 1 year ago |
| ... | ... | ... | ... | ... |

### Step 2: Pull Performance Metrics

For each live flow, pull from Klaviyo:

**Last 30 Days:**
- Recipients
- Open Rate
- Click Rate
- Revenue (if tracked)
- Conversion Rate

**Compare to:**
- Industry benchmarks
- Previous period
- Other flows in same account

### Step 3: Analyze Each Flow

For every flow, answer these questions:

**Existence Check**
- [ ] Does this flow exist?
- [ ] Is it turned on?
- [ ] Is the trigger correct?

**Content Review**
- [ ] Is the copy on-brand and compelling?
- [ ] Are CTAs clear?
- [ ] Is personalization being used?
- [ ] Is the design modern and mobile-friendly?

**Timing Review**
- [ ] Are delays appropriate?
- [ ] Is frequency reasonable?
- [ ] Smart sending enabled?

**Performance Review**
- [ ] Open rate vs benchmark?
- [ ] Click rate vs benchmark?
- [ ] Revenue attribution (if applicable)?
- [ ] Any email significantly underperforming?

**Technical Review**
- [ ] Are filters/conditions correct?
- [ ] Any broken links?
- [ ] Personalization working?
- [ ] Exclusions properly set?

---

## Flow Benchmarks

| Flow | Open Rate | Click Rate | Notes |
|------|-----------|------------|-------|
| Welcome | 45-55% | 5-10% | High engagement expected |
| Abandoned Cart | 40-50% | 5-15% | Revenue driver |
| Browse Abandon | 35-45% | 3-7% | Lower intent than cart |
| Post-Purchase | 50-60% | 5-10% | Transactional, high open |
| Winback | 20-30% | 1-3% | Harder audience |

*Benchmarks vary by industry and brand. Use as directional guidance.*

---

## Step 4: Create Recommendations

### Prioritization Framework

**Priority 1: Quick Wins** (Do first)
- Low effort, high impact
- Example: Turn on a disabled flow, fix broken link

**Priority 2: Revenue Drivers** (Do next)
- High impact on revenue
- Example: Rebuild abandoned cart, add SMS to flows

**Priority 3: Optimization** (Ongoing)
- Incremental improvements
- Example: A/B test subject lines, add emails to sequence

**Priority 4: New Flows** (When capacity allows)
- Building flows that don't exist
- Example: Create sunset flow, add back-in-stock

### Recommendation Format

For each recommendation:
```
**Flow:** [Flow Name]
**Issue:** [What's wrong or missing]
**Recommendation:** [What to do]
**Impact:** High / Medium / Low
**Effort:** High / Medium / Low
**Priority:** 1 / 2 / 3 / 4
```

---

## Step 5: Present to Client

### Audit Presentation Structure

1. **Overview**
   - What we reviewed
   - Overall health score (if you want to quantify)

2. **Current State Summary**
   - What flows exist
   - Quick performance overview

3. **Key Findings**
   - What's working well
   - What needs attention

4. **Recommendations**
   - Prioritized list
   - Estimated impact

5. **Proposed Roadmap**
   - What to do first
   - Suggested timeline

---

## Audit Deliverables

- [ ] Flow inventory spreadsheet
- [ ] Performance metrics export
- [ ] Audit findings document
- [ ] Prioritized recommendations
- [ ] Proposed roadmap

Save all deliverables to: `Google Drive > Clients > [Name] > Strategy`

---

## Time Investment

| Task | Time |
|------|------|
| Document current state | 30 min |
| Pull metrics | 30 min |
| Analyze each flow | 1-2 hours |
| Create recommendations | 1 hour |
| Build presentation | 30 min |
| **Total** | **3-4 hours** |

---

## Post-Audit

- [ ] Share findings in client Slack
- [ ] Schedule call to review (if needed)
- [ ] Get approval on priorities
- [ ] Create ClickUp tasks for approved work
- [ ] Schedule optimization work

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Client has no flows | Prioritize critical flows, build from templates |
| Flows exist but all disabled | Investigate why, likely needs rebuild |
| No revenue tracking | Set up Shopify integration first |
| Client resistant to changes | Show benchmark data, start with one A/B test |

---

## Related SOPs
- [Client Onboarding](./client-onboarding.md)
- [Campaign Launch](./campaign-launch.md)
