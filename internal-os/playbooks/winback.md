# Winback Playbook

## Why Winback Matters

Winback flows re-engage **lapsed customers**—people who bought before but haven't returned. It's much cheaper to retain an existing customer than acquire a new one.

**Benchmark:** Winback flows have lower metrics than other flows (these are disengaged people), but recovering even 5-10% of lapsed customers significantly impacts revenue.

- Open rates: 20-30% (lower because audience is less engaged)
- Conversion rates: 2-5%

---

## Who is a "Lapsed" Customer?

**Definition varies by business.** Consider:

| Business Type | Typical Lapse Period |
|---------------|---------------------|
| Consumable (skincare, supplements) | 60-90 days since last purchase |
| Fashion/apparel | 90-120 days |
| High-consideration (furniture, electronics) | 180-365 days |
| Subscription-based | After cancellation or X months of inactivity |

**Rule of thumb:** If the average customer repurchases every 45 days, someone who hasn't bought in 90+ days is likely lapsed.

---

## Flow Structure

### Recommended: 3-Email Winback Series

```
[X] Days Since Last Purchase
  │
  ▼ (Trigger)
┌─────────────────────────────┐
│ Email 1: "We Miss You"      │
│ Open: 25-35% │ Click: 3-5%  │
└─────────────────────────────┘
  │
  ▼ (Wait 7 days)
┌─────────────────────────────┐
│ Email 2: Incentive Offer    │
│ Open: 20-30% │ Click: 3-6%  │
└─────────────────────────────┘
  │
  ▼ (Wait 7-14 days)
┌─────────────────────────────┐
│ Email 3: Last Chance        │
│ Open: 15-25% │ Click: 3-5%  │
└─────────────────────────────┘
       │
       ▼
   Still inactive?
       │
       ▼
 Move to Sunset Flow
 (eventual suppression)
```

---

## Email-by-Email Breakdown

### Email 1: "We Miss You" (Trigger: X Days Since Purchase)

**Goal:** Reconnect, remind them why they loved you

**Subject Line Frameworks:**
- "We miss you, [First Name]"
- "It's been a while..."
- "Long time no see 👋"
- "Are we still friends?"

**Content Structure:**
1. **Acknowledge absence** (we noticed you haven't been back)
2. **Remind them of value** (what made them buy in the first place)
3. **What's new** (new products, improvements since they left)
4. **Soft CTA** (come back and browse)

**Copy Framework:**
```
Hey [First Name],

It's been a while since we've seen you—we miss you!

Since your last visit, we've been busy:
- [New product or collection]
- [Improvement or update]
- [Reason to come back]

Ready to rediscover [Brand]?

[CTA: See What's New]

[Sign-off]
```

**Tone:** Friendly, not desperate. Remind them of the relationship.

**Design Notes:**
- Show what's new (new products, best sellers)
- Keep it light—first touch
- No heavy discount yet

---

### Email 2: Incentive Offer (7 Days Later)

**Goal:** Give them a reason to act now

**Subject Line Frameworks:**
- "Come back and save [X%]"
- "A gift to welcome you back"
- "Here's [X%] off—we want you back"
- "Special offer inside"

**Content Structure:**
1. **Reference first email** (we reached out, you're still missed)
2. **Present the offer** (discount, free shipping, gift)
3. **Time limit** (create urgency)
4. **Clear CTA**

**Copy Framework:**
```
Hey [First Name],

We still miss you! And we want to make it worth your while to come back.

Here's [X% off / $X off / free shipping] on your next order:

Code: [WINBACK]

Use it on:
[PRODUCT 1]
[PRODUCT 2]
[PRODUCT 3 - best sellers or new arrivals]

[CTA: Shop Now & Save]

Offer expires in [X] days.

[Sign-off]
```

**Offer strategy:**
- 10-20% off is common
- Can escalate from Email 1 (no offer) to Email 2 (small offer) to Email 3 (bigger offer)
- Or make Email 2 the strongest offer and Email 3 "last chance"

---

### Email 3: Last Chance (7-14 Days Later)

**Goal:** Final push before moving to sunset/suppression

**Subject Line Frameworks:**
- "Last chance, [First Name]"
- "Your offer expires tomorrow"
- "Should we stay in touch?"
- "Before you go..."

**Content Structure:**
1. **Urgency** (this is your last chance)
2. **Restate offer** (if using incentive)
3. **Emotional appeal** (we value you as a customer)
4. **Final CTA**

**Copy Framework:**
```
Hey [First Name],

This is our last email for now—and your last chance to use your [X%] off.

Code: [WINBACK]

We'd love to have you back, but we get it if life is busy.

If you're still interested in [Brand], now's the time.

[CTA: Use My Discount]

If we don't hear from you, we'll give you some space.
(You can always come back anytime.)

[Sign-off]
```

**Tone:** Respectful, not guilt-trippy. Accept that some people churn.

---

## Conditional Logic

### Exit on Purchase

```
After each email:
  │
  Has placed order? ──Yes──► Exit flow (move to post-purchase)
  │
  No
  │
  Continue
```

### After Winback Fails

If they complete the flow without purchasing:

**Option A:** Move to Sunset Flow
- Reduced frequency
- Eventual suppression after X months of inactivity

**Option B:** Back to Regular Marketing
- Some brands continue marketing at normal cadence
- Risk: hurts deliverability if they truly don't want emails

**Recommended:** Move to sunset, protect deliverability.

---

## Winback vs. Sunset

| Winback | Sunset |
|---------|--------|
| Active attempt to re-engage | Graceful exit |
| Includes incentives | Usually no incentive |
| 3-4 emails | 1-2 emails |
| Goal: win them back | Goal: clean list |

**Winback comes first**, then if it fails, sunset.

---

## Timing Strategy

| Factor | Consideration |
|--------|---------------|
| Lapse trigger | Depends on purchase frequency (see "Who is Lapsed" section) |
| Flow duration | 2-4 weeks total |
| Delays between emails | 7-14 days (spread out more than other flows) |

**Multi-stage approach:**

Some brands do staged winback:
- 60 days: Light touch ("we miss you")
- 90 days: Incentive offer
- 120 days: Last chance
- 150+ days: Sunset

---

## Incentive Strategy

### How Much to Offer

| Customer Value | Offer |
|----------------|-------|
| High LTV customer | Stronger offer (15-20% or free gift) |
| One-time buyer | Moderate offer (10-15%) |
| Low AOV buyer | Light offer or urgency only |

### Escalating Offers

```
Email 1: No offer (just reconnect)
Email 2: 10% off
Email 3: 15% off (final push)
```

**vs. Single Strong Offer:**

```
Email 1: No offer
Email 2: 20% off (strongest)
Email 3: Reminder of same offer + urgency
```

---

## Optimization Checklist

### A/B Test Ideas

**Subject Lines:**
- Emotional ("We miss you") vs. direct ("20% off inside")
- Name personalization vs. no name
- Emoji vs. no emoji

**Offers:**
- Discount % vs. $ amount
- Free shipping vs. % off
- With offer vs. no offer in Email 1

**Timing:**
- 60-day trigger vs. 90-day
- 7-day delays vs. 14-day delays

### Performance Red Flags

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Very low opens | Already disengaged, bad deliverability | Check spam, try different subject approach |
| Opens but no clicks | Offer not compelling enough | Increase offer, change products shown |
| No conversions | May be truly churned | Accept some churn, focus on preventing it earlier |
| High unsubscribes | Too aggressive | Soften tone, reduce frequency |

---

## Winback Checklist

Before launching:

- [ ] Lapse period defined (e.g., 90 days since last purchase)
- [ ] Trigger: Placed Order at least once + X days ago
- [ ] Flow filter: Has not placed order since entering flow
- [ ] Discount code created and working
- [ ] Exit condition: Placed order → exit
- [ ] Post-winback: sunset flow or suppression path defined
- [ ] Not overlapping with other flows

---

## Example Subject Lines

**Email 1 (We Miss You):**
- We miss you, [First Name]!
- It's been a while...
- Where'd you go? 👀
- Long time no see

**Email 2 (Incentive):**
- Come back for 15% off
- A little something to say "we miss you"
- Here's a reason to come back
- Your exclusive offer inside

**Email 3 (Last Chance):**
- Last call, [First Name]
- Your 15% off expires tomorrow
- Should we stay in touch?
- One final offer before we go

---

## Related Playbooks
- [Post-Purchase](./post-purchase.md)
- [Welcome Series](./welcome-series.md)
