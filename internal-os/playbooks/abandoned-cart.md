# Abandoned Cart Playbook

## Why Abandoned Cart Matters

~70% of ecommerce carts are abandoned. This flow directly recovers revenue that would otherwise be lost. It's typically the **highest revenue-generating flow** after welcome.

**Benchmark:** Abandoned cart flows recover 5-15% of abandoned carts, often generating 10-20% of total Klaviyo revenue.

---

## Flow Structure

### Recommended: 3-Email Abandoned Cart

```
Checkout Started (cart abandoned)
  │
  ▼ (Wait 1-4 hours)
┌─────────────────────────────┐
│ Email 1: Soft Reminder      │
│ Open: 45-55% │ Click: 10-15%│
└─────────────────────────────┘
  │
  ▼ (Wait 24 hours)
┌─────────────────────────────┐
│ Email 2: Handle Objections  │
│ Open: 40-50% │ Click: 8-12% │
└─────────────────────────────┘
  │
  ▼ (Wait 24-48 hours)
┌─────────────────────────────┐
│ Email 3: Urgency/Incentive  │
│ Open: 35-45% │ Click: 8-12% │
└─────────────────────────────┘
```

**Total flow duration:** 2-4 days

---

## Email-by-Email Breakdown

### Email 1: Soft Reminder (1-4 hours after abandonment)

**Goal:** Gentle nudge, catch technical issues, provide helpful reminder

**Subject Line Frameworks:**
- "Did you forget something?"
- "Your cart is waiting"
- "You left this behind"
- "Still thinking it over?"

**Content Structure:**
1. **Acknowledge** (we noticed you left items)
2. **Show the cart** (images + product names)
3. **Easy return CTA** (one click back to cart)
4. **Help available** (questions? Reply to this email)

**Copy Framework:**
```
Hey [First Name],

Looks like you left some items in your cart.

[CART CONTENTS - images + names + prices]

No worries if you weren't ready—your cart is saved.

[CTA: Complete My Order]

Questions? Just reply to this email and we're happy to help.

[Sign-off]
```

**Tone:** Helpful, not pushy. Assume good intent (maybe they got distracted, had technical issues).

**Design Notes:**
- Show actual cart items with images
- Make CTA button prominent
- Keep it short and clean
- Dynamic cart contents via Klaviyo

---

### Email 2: Handle Objections (24 hours later)

**Goal:** Address common reasons for abandonment

**Subject Line Frameworks:**
- "Questions about your order?"
- "Let us help you decide"
- "Here's what you're missing"
- "Still on the fence?"

**Common Objections to Address:**
- **Shipping concerns** → "Free shipping on orders over $X"
- **Return policy** → "30-day no-questions-asked returns"
- **Quality concerns** → "5-star reviews from X customers"
- **Price hesitation** → Social proof, value proposition

**Content Structure:**
1. **Acknowledge hesitation** (we get it, decisions are hard)
2. **Show cart again** (reminder of what they wanted)
3. **Address objections** (trust signals, guarantees)
4. **Social proof** (quick testimonial or rating)
5. **CTA** (complete order)

**Copy Framework:**
```
Hey [First Name],

Still thinking about [product/items in cart]?

[CART CONTENTS]

We want you to feel confident in your purchase:

✓ Free returns within 30 days
✓ Free shipping over $[X]
✓ [X]+ 5-star reviews

Here's what [Customer Name] said:
"[Short testimonial]"

[CTA: Complete My Order]

[Sign-off]
```

**Design Notes:**
- Include trust badges
- Add a customer review
- Clear value proposition bullets

---

### Email 3: Urgency or Incentive (24-48 hours later)

**Goal:** Final push with urgency or sweetened offer

**Two Strategies:**

#### Option A: Urgency (No Discount)
- "Your cart is about to expire"
- "Items selling fast"
- "Low stock warning"

#### Option B: Incentive (With Discount)
- "Here's 10% off to complete your order"
- "Free shipping—just for you"

**Which to use?**
- Strong brand, high margins → Option B (incentive)
- Discount-sensitive brand → Option A (urgency only)
- Already used welcome discount → Option A first, then B later

**Subject Line Frameworks (Urgency):**
- "Your cart expires at midnight"
- "⚠️ Low stock alert on your items"
- "Last chance to complete your order"

**Subject Line Frameworks (Incentive):**
- "A little something to help you decide"
- "Here's 10% off your cart"
- "We added free shipping to your order"

**Copy Framework (Urgency):**
```
Hey [First Name],

Your cart is about to expire—we can only hold items for so long.

[CART CONTENTS]

If these items sell out, we can't guarantee when they'll be back.

[CTA: Complete My Order Now]

[Sign-off]
```

**Copy Framework (Incentive):**
```
Hey [First Name],

We really think you'll love [product]. So here's a little something
to make the decision easier:

Use code [CODE] for [X% off / free shipping].

[CART CONTENTS]

[CTA: Claim My Discount]

Offer valid for 24 hours.

[Sign-off]
```

---

## Conditional Logic

### Already Purchased?

Add exit conditions:

```
After each email:
  │
  Has placed order? ──Yes──► Exit flow
  │
  No
  │
  Continue to next email
```

**In Klaviyo:** Use "Has not placed order since starting this flow" as a flow filter.

### First-Time vs. Repeat Customers

| Customer Type | Adjustment |
|---------------|------------|
| First-time | Include more trust signals, maybe stronger offer |
| Repeat | Lighter touch, they already trust you |

---

## Timing Strategy

| Timing Factor | Consider |
|---------------|----------|
| **Email 1 delay** | 1-4 hours. Too fast feels creepy. Too slow misses the moment. |
| **Email 2 delay** | 24 hours gives time to consider but keeps momentum |
| **Email 3 delay** | 24-48 hours. Not too long or interest fades |
| **Total duration** | 2-4 days max. After that, move to browse/winback |

**High-consideration products (expensive, research-heavy):**
- Extend delays slightly
- Add more social proof
- Consider an extra email

**Impulse products (low cost, quick decision):**
- Tighten delays
- Fewer emails (maybe just 2)
- Strong offer in Email 2

---

## Discount Strategy Decision Tree

```
Should we discount in abandoned cart?
          │
          ▼
Are margins healthy (>50%)? ──No──► No discount, use urgency
          │
         Yes
          │
          ▼
Did they already get welcome discount?
          │
    ┌─────┴─────┐
   Yes          No
    │            │
    ▼            ▼
No discount    Small discount
 in cart       OK (5-10%)
```

**Warning:** Training customers to abandon cart for discounts is a real risk. Consider:
- Offering value (free gift, upgraded shipping) vs. discounts
- Limiting discount to first cart abandonment only
- Only offering discount to non-purchasers after X days

---

## SMS Addition

Consider adding SMS to abandoned cart (especially Email 1 timing):

```
[Brand]: Hey [Name]! You left [product] in your cart.
Complete your order here: [link]
Reply STOP to opt out
```

**SMS best practices:**
- Only send if they've opted in to SMS
- Keep it under 160 characters
- Include product name for relevance
- Direct link to cart

---

## Optimization Checklist

### A/B Test Ideas

**Subject Lines:**
- Question vs. statement ("Did you forget?" vs. "Your cart is waiting")
- With vs. without product name
- Urgency words vs. soft approach

**Content:**
- With incentive vs. without
- 3 emails vs. 2 emails
- Amount of social proof

**Timing:**
- 1 hour vs. 4 hour first email
- Different delays between emails

### Performance Red Flags

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Low open rate | Weak subject lines or bad timing | A/B test subjects, adjust timing |
| Opens but no clicks | CTA not clear, cart not showing | Make CTA prominent, fix dynamic content |
| Clicks but no purchase | Checkout friction | Review checkout flow with client |
| Working but low volume | Not enough traffic | Focus on list growth, traffic |

---

## Cart Abandonment Checklist

Before launching:

- [ ] Trigger is "Started Checkout" or "Added to Cart"
- [ ] Flow filter excludes those who purchased
- [ ] Dynamic cart content working (test!)
- [ ] All links go to cart (not homepage)
- [ ] Discount code works (if using)
- [ ] Mobile preview looks good
- [ ] Smart sending enabled
- [ ] Exit conditions set for purchase

---

## Example Subject Lines

**Email 1 (Soft Reminder):**
- You left something behind 👀
- Your cart is feeling lonely
- Still want [Product Name]?
- [First Name], your cart is saved

**Email 2 (Objection Handling):**
- Need help deciding?
- Here's why customers love [Product]
- Questions about your order?
- [X,000] customers can't be wrong

**Email 3 (Urgency/Incentive):**
- Last chance: your cart expires soon
- We saved this for you (but not for long)
- Okay fine, here's 10% off 😊
- Your items are almost gone

---

## Related Playbooks
- [Browse Abandonment](./browse-abandonment.md)
- [Welcome Series](./welcome-series.md)
- [Winback](./winback.md)
