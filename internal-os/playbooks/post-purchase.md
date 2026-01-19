# Post-Purchase Playbook

## Why Post-Purchase Matters

The post-purchase flow builds customer loyalty and drives repeat purchases. A customer who just bought is:
- Highly engaged (just gave you money)
- Open to communication (expecting shipping updates)
- Primed for relationship building

**Goal:** Turn one-time buyers into repeat customers.

**Benchmark:** Post-purchase emails have high opens (50-60%) because customers expect them. Focus on building LTV rather than immediate conversions.

---

## Flow Structure

### Recommended: 4-Email Post-Purchase Series

```
Order Placed
  │
  ▼ (Immediate)
┌─────────────────────────────┐
│ Email 1: Thank You          │
│ Open: 60-70%                │
└─────────────────────────────┘
  │
  ▼ (Wait for delivery + 2 days)
┌─────────────────────────────┐
│ Email 2: Check-in + Tips    │
│ Open: 40-50% │ Click: 5-10% │
└─────────────────────────────┘
  │
  ▼ (Wait 5-7 days)
┌─────────────────────────────┐
│ Email 3: Review Request     │
│ Open: 35-45% │ Click: 3-5%  │
└─────────────────────────────┘
  │
  ▼ (Wait 14-21 days)
┌─────────────────────────────┐
│ Email 4: Cross-sell/Replen  │
│ Open: 30-40% │ Click: 3-6%  │
└─────────────────────────────┘
```

---

## Email-by-Email Breakdown

### Email 1: Thank You (Immediate)

**Goal:** Confirm purchase, build excitement, set expectations

**Note:** This is NOT the transactional order confirmation (Shopify sends that). This is a branded thank you.

**Subject Line Frameworks:**
- "Thank you for your order!"
- "Welcome to [Brand], [First Name]!"
- "Your [Product] is on its way"
- "You made a great choice"

**Content Structure:**
1. **Genuine thank you** (not generic—make it warm)
2. **What to expect** (shipping timeline, what's coming)
3. **Build excitement** (about the product they bought)
4. **Support info** (how to reach you if questions)

**Copy Framework:**
```
Hey [First Name],

Thank you for your order!

We're thrilled you chose [Brand]. Your [Product] is being prepared
and will ship within [X days].

What's next:
- You'll receive tracking info when it ships
- Expected delivery: [X] days
- Questions? Reply to this email anytime

We can't wait for you to try it!

[Sign-off]
```

**Tone:** Warm, personal, excited. They just became a customer—celebrate that!

---

### Email 2: Check-in + Tips (After Delivery)

**Goal:** Ensure satisfaction, provide value, address issues proactively

**Timing:** 2-3 days after expected delivery (use Shopify shipping data if possible)

**Subject Line Frameworks:**
- "How's your [Product]?"
- "Tips to get the most from [Product]"
- "Did everything arrive okay?"
- "Quick tips from our team"

**Content Structure:**
1. **Check in** (did you receive it? Everything good?)
2. **How to use** (tips, guides, best practices)
3. **FAQ** (answer common questions proactively)
4. **Support CTA** (make it easy to get help)

**Copy Framework:**
```
Hey [First Name],

Your [Product] should have arrived by now—we hope you love it!

Here are a few tips to get the best results:

1. [Tip 1]
2. [Tip 2]
3. [Tip 3]

[Link: Full Guide / How-to Video]

Any questions? Hit reply and we're here to help.

[Sign-off]
```

**Design Notes:**
- Can include how-to images or video thumbnail
- Keep tips scannable (bullets, short)
- Make support access obvious

---

### Email 3: Review Request (5-7 days after delivery)

**Goal:** Collect social proof (reviews, UGC, testimonials)

**Subject Line Frameworks:**
- "How do you like your [Product]?"
- "Quick favor, [First Name]?"
- "Share your experience"
- "We'd love your feedback"

**Content Structure:**
1. **Ask for review** (direct, clear)
2. **Make it easy** (direct link to review platform)
3. **Incentive** (optional: small discount for next purchase)
4. **UGC ask** (share on social, tag us)

**Copy Framework:**
```
Hey [First Name],

You've had [Product] for about a week now.

We'd love to hear what you think! Your review helps other customers
and helps us improve.

[CTA: Leave a Review] (direct link to review platform)

If you share on Instagram, tag us @[handle] for a chance to be featured!

Thanks for being part of the [Brand] family.

[Sign-off]
```

**Options for reviews:**
- Native Shopify reviews
- Third-party: Yotpo, Judge.me, Stamped, Okendo
- Link directly to review submission page

**Incentive ideas:**
- 10% off next order for review
- Loyalty points
- Entry into monthly giveaway

---

### Email 4: Cross-sell / Replenishment (14-21 days)

**Goal:** Drive second purchase

**Two approaches based on product type:**

#### Option A: Cross-sell (Non-Consumable Products)
"You might also like..."

**Subject Lines:**
- "Perfect with your [Product]"
- "Customers who bought [Product] also love..."
- "Complete your collection"

**Content:**
```
Hey [First Name],

Loving your [Product]?

Customers who bought [Product] often pair it with:

[COMPLEMENTARY PRODUCT 1]
[COMPLEMENTARY PRODUCT 2]
[COMPLEMENTARY PRODUCT 3]

[CTA: Shop Now]

[Sign-off]
```

#### Option B: Replenishment (Consumable Products)
"Time to reorder..."

**Subject Lines:**
- "Running low on [Product]?"
- "Time to restock?"
- "[Product] refill time"

**Content:**
```
Hey [First Name],

It's been [X] days since your last order—you might be running low!

[PRODUCT IMAGE]

Reorder now and never run out.

[CTA: Reorder Now]

[Optionally: Subscribe and save X%]

[Sign-off]
```

---

## Conditional Logic

### Split by First-Time vs. Repeat Customer

```
Order Placed
     │
     ▼
First purchase ever?
     │
┌────┴────┐
Yes       No
│         │
▼         ▼
Full      Abbreviated
Post-     Post-Purchase
Purchase  (fewer emails)
```

**First-time buyers:** Full sequence—they need onboarding and relationship building.

**Repeat buyers:** Lighter touch—they already know you. Maybe just thank you + review.

### Split by Product Category

Different products may need different tips, cross-sells, or replenishment timing.

---

## Timing Considerations

| Email | Timing | Depends On |
|-------|--------|------------|
| Thank you | Immediate | Order placed |
| Check-in | Delivery + 2 days | Shipping time (3-7 days typically) |
| Review | Delivery + 5-7 days | Time to use product |
| Cross-sell | 14-21 days | Re-purchase cycle |

**For consumable products:** Calculate reorder timing based on typical usage. If product lasts 30 days, Email 4 should hit around day 25.

---

## First-Time Buyer Extras

For first-time buyers, consider adding:
- Brand story (if not in welcome series)
- Community invitation (Facebook group, Instagram)
- Referral program intro
- Loyalty program signup

---

## Optimization Checklist

### A/B Test Ideas

**Review Email:**
- With incentive vs. without
- Star rating visual vs. text ask
- Early (day 3) vs. later (day 7)

**Cross-sell Email:**
- Specific product recommendations vs. "shop all"
- Discount vs. no discount
- Timing variations

### Performance Red Flags

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Low review submissions | Too hard to leave review | Simplify process, direct link |
| No cross-sell clicks | Wrong products recommended | Improve product recommendations |
| Unsubscribes on flow | Too many emails | Reduce frequency, add value |
| Low opens on thank you | Subject looks transactional | Make it more branded/personal |

---

## Post-Purchase Checklist

Before launching:

- [ ] Trigger: Placed Order
- [ ] Thank you email is distinct from Shopify transactional
- [ ] Check-in timing accounts for shipping
- [ ] Review link goes to correct platform
- [ ] Cross-sell products are relevant
- [ ] First-time vs. repeat split configured
- [ ] Doesn't conflict with other flows

---

## Example Subject Lines

**Email 1 (Thank You):**
- Thank you, [First Name]! 🙌
- Your order is confirmed
- Welcome to [Brand]!
- Great choice—here's what's next

**Email 2 (Check-in):**
- Did everything arrive?
- Tips for your new [Product]
- Get the most from your purchase
- How's it going?

**Email 3 (Review):**
- We'd love your feedback
- Quick favor?
- How do you like [Product]?
- Leave a review, get 10% off

**Email 4 (Cross-sell/Replen):**
- Pairs perfectly with [Product]
- Running low?
- Complete your [collection/routine]
- Your next favorite thing

---

## Related Playbooks
- [Winback](./winback.md)
- [Welcome Series](./welcome-series.md)
