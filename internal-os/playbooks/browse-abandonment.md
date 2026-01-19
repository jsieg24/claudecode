# Browse Abandonment Playbook

## Why Browse Abandonment Matters

Browse abandonment targets people who viewed products but didn't add to cart. These are **window shoppers** with demonstrated interest but lower intent than cart abandoners.

**Benchmark:** Lower conversion than abandoned cart (they haven't committed yet), but catches a much larger audience. Typically 2-5% conversion rate, contributing 3-8% of Klaviyo revenue.

---

## Flow Structure

### Recommended: 2-Email Browse Abandonment

```
Product Viewed (no cart add)
  │
  ▼ (Wait 2-4 hours)
┌─────────────────────────────┐
│ Email 1: "Still Looking?"   │
│ Open: 35-45% │ Click: 5-8%  │
└─────────────────────────────┘
  │
  ▼ (Wait 24-48 hours)
┌─────────────────────────────┐
│ Email 2: Social Proof/Recs  │
│ Open: 30-40% │ Click: 4-6%  │
└─────────────────────────────┘
```

**Why only 2 emails?** Lower intent = less justification for aggressive follow-up. Don't annoy casual browsers.

---

## Important: Trigger Configuration

### Trigger: Viewed Product

**Critical exclusions:**
- Has not started checkout
- Has not added to cart
- Has not placed order
- Has not received this email in last X days (7-14)

### Frequency Capping

Browse abandonment can trigger frequently. Prevent email fatigue:
- Once per person per 7-14 days
- Or: Once per product per 30 days

---

## Email-by-Email Breakdown

### Email 1: "Still Looking?" (2-4 hours after browse)

**Goal:** Bring them back, remind them of what caught their eye

**Subject Line Frameworks:**
- "Caught your eye?"
- "Still thinking about [Product]?"
- "Take another look"
- "Did you find what you're looking for?"

**Content Structure:**
1. **Acknowledge** (we noticed you were browsing)
2. **Show the product** (what they viewed)
3. **Light CTA** (take another look)
4. **Related products** (optional, in case they want alternatives)

**Copy Framework:**
```
Hey [First Name],

We noticed you were checking out [Product Name].

[PRODUCT IMAGE + NAME + PRICE]

Good choice—it's one of our favorites.

[CTA: Take Another Look]

[Optional: "You might also like..." section with 2-3 related products]

[Sign-off]
```

**Tone:** Casual, helpful. NOT "you forgot something" (they didn't forget—they just looked).

**Design Notes:**
- Hero image of the product they viewed
- Keep it light—this is lower intent
- Optional: show related products in case that one wasn't right

---

### Email 2: Social Proof & Recommendations (24-48 hours later)

**Goal:** Build confidence, offer alternatives if the first wasn't right

**Subject Line Frameworks:**
- "Customers love [Product]"
- "See why [Product] is a best seller"
- "More options you'll love"
- "Not sure? Here's what others are buying"

**Content Structure:**
1. **Reference the product** (what they were looking at)
2. **Social proof** (reviews, ratings, "best seller" badge)
3. **Alternative products** (in case they want options)
4. **CTA** (shop now)

**Copy Framework:**
```
Hey [First Name],

Still interested in [Product Name]?

Here's what customers are saying:

⭐⭐⭐⭐⭐ "[Short review]" - [Customer]

[PRODUCT IMAGE + CTA]

Not quite right? Try these alternatives:

[2-3 RELATED PRODUCTS]

[CTA: Shop Now]

[Sign-off]
```

---

## Conditional Logic

### Exit Conditions

```
After Email 1:
  │
  ├── Added to cart? ──► Exit (moves to cart abandonment)
  ├── Placed order? ──► Exit
  │
  Continue to Email 2
```

### Segment by Browse Depth

Consider different flows for:
- **Viewed 1 product** → Standard browse abandonment
- **Viewed 3+ products** → Higher intent, maybe more aggressive follow-up
- **Viewed product multiple times** → Very interested, prioritize this product

---

## Browse vs. Cart Abandonment

| Aspect | Browse Abandonment | Cart Abandonment |
|--------|-------------------|------------------|
| Intent | Lower (just looking) | Higher (ready to buy) |
| Trigger | Viewed product | Started checkout |
| Tone | Casual, helpful | More urgent |
| # of emails | 2 | 3 |
| Discounts | Rarely | Sometimes |
| Volume | Higher | Lower |

**Important:** Make sure browse flow exits when they add to cart—don't send both flows!

---

## Timing Strategy

| Timing | Rationale |
|--------|-----------|
| Email 1: 2-4 hours | Soon enough they remember, not so fast it's creepy |
| Email 2: 24-48 hours | Give them time, gentle reminder |

**For different product types:**
- Impulse purchases → Tighter timing (1-2 hours, 12 hours)
- Considered purchases → Longer timing (4 hours, 48 hours)

---

## Should You Include Discounts?

**Generally: No.**

Reasons:
- They haven't committed (added to cart) yet
- Trains customers to browse without buying
- Erodes margins on window shoppers

**Exception:** If they've browsed the same product 3+ times, a small incentive might push them over.

---

## Optimization Checklist

### A/B Test Ideas

**Subject Lines:**
- Product name in subject vs. not
- Question vs. statement
- "You" focused vs. product focused

**Content:**
- Single product vs. product + recommendations
- With reviews vs. without
- Different product image styles

**Timing:**
- 2 hours vs. 4 hours for first email

### Performance Red Flags

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Very low opens | Subject doesn't resonate | Test more curiosity-based subjects |
| Opens but no clicks | Product image not compelling | Use better product photo, add price |
| Feels spammy to customers | Triggering too often | Increase frequency cap |
| Low overall volume | Not enough product views | Site traffic issue, not email issue |

---

## Browse Abandonment Checklist

Before launching:

- [ ] Trigger: Viewed Product
- [ ] Exclusion: Has not started checkout
- [ ] Exclusion: Has not added to cart
- [ ] Exclusion: Has not placed order
- [ ] Frequency cap: 1 per person per 7-14 days
- [ ] Dynamic product content working
- [ ] Links go to product page (not homepage)
- [ ] Mobile preview looks good
- [ ] Exits to cart abandonment flow if they add to cart

---

## Example Subject Lines

**Email 1 (Still Looking):**
- Caught your eye?
- Take another look at [Product]
- Still thinking about it?
- [First Name], did you find what you need?

**Email 2 (Social Proof/Recs):**
- Why [Product] is a customer favorite
- See what you're missing
- More options for you
- Customers love [Product]—here's why

---

## Related Playbooks
- [Abandoned Cart](./abandoned-cart.md)
- [Welcome Series](./welcome-series.md)
