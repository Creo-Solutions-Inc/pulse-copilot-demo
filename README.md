# Pulse Co-Pilot – User Journey & Feature Guide. 

Welcome to Pulse Co-Pilot, your AI-powered call analytics and daily recap system that transforms conversations into actionable insights. This guide walks you through every feature and how to use it effectively.

## 📋 Getting Started

### 1. Login Experience
Url: /

What you'll see:

Clean, professional login interface with Pulse Co-Pilot branding

White-label ready (CSP logo placeholder)

Demo Mode: Any credentials will work for testing

<img height="400" alt="image" src="https://github.com/user-attachments/assets/48072dc1-9325-4fc0-8184-20c09bbd085e" />




### 2. Dashboard Overview

Url : /dashboard

What you'll see:

Key Metrics Cards:

Total Calls

Answered

Missed

Average Duration

Quick Action Cards:

Navigate to Call List, Configuration, Email Previews

Recent Activity Feed:

Latest calls with timestamps and sentiment indicators

<img height="400" alt="image" src="https://github.com/user-attachments/assets/d335c3e3-c3b9-418f-acd7-0cb3c1df0094" />




### 3. Call List

Url: /calls

What you'll see:

Searchable table of all calls

Filters by call type and outcome

Sentiment badges (color-coded)

Click any row → View details

<img height="400" alt="image" src="https://github.com/user-attachments/assets/05c3b747-4225-438f-b079-bde5bd503dea" />



### 4. Individual Call Details

Url: /calls/[id]

What you'll see:

Complete call information

Sentiment & Quality Analysis

Summary + Action Items

Quick actions:

Preview Email

Download Recording

View Transcript

<img height="400" alt="image" src="https://github.com/user-attachments/assets/ce808e4d-9d4a-4386-8e82-e6ebd5c72a30" />


### Configuration Tab

### 5. End-of-Call Configuration

Url: /configuration/end-of-call

What you'll see:

Email settings form:

Subject

Intro text

Recipients

Monitored numbers

Real-time configuration preview

Template variable reference

<img height="400" alt="image" src="https://github.com/user-attachments/assets/d218e770-cfdf-47b3-9268-9119e14d03b9" />




## 6. End-of-Day Configuration

Url: /configuration/end-of-day

What you'll see:

Daily summary settings:

Subject

Intro text

Recipients

Send time

Preview of daily summary email layout

<img height="400" alt="image" src="https://github.com/user-attachments/assets/f1f27c57-6e85-47ff-a5a1-d7d10b089e4c" />



### Mail Box (Email Previews)

### 7. End-of-Call Email Previews

Url: /mailbox/end-of-call

What you'll see:

Complete email templates with sample call data

Professional formatting and branding

<img height="400" alt="image" src="https://github.com/user-attachments/assets/79d9f1e6-f84c-4a7b-81b2-494d4551f6d2" />



### 8. End-of-Day Email Previews

Url: /mailbox/end-of-day

What you'll see:

Daily summary emails with:

Aggregated metrics

Key performance indicators

Action items

Email-ready templates for CSPs

<img height="400" alt="image" src="https://github.com/user-attachments/assets/a82d9ce5-d4de-45db-b5eb-e2c4b447b8c0" />



## **User Journey Scenarios**

These scenarios demonstrate the primary user flows for Pulse Co-Pilot.

---

### **Primary Scenario 1: End-of-Call Summary**
**Goal:** Show how a user experiences an email summary immediately after a call.

**Steps:**
1. Complete a call monitored by Pulse Co-Pilot.
2. Open your **Email Inbox** (configured recipient list).
3. View the **End-of-Call Summary Email**, which includes:
   - Call details (internal number, external number, time, duration).
   - AI-generated summary of the conversation.
   - Sentiment and quality score.
   - Action items for follow-up.
4. If needed, click links in the email to:
   - View call details in Pulse Co-Pilot.
   - Download recording or view transcript.

---

### **Primary Scenario 2: Daily Recap Email**
**Goal:** Demonstrate how the daily summary provides a full view of call activity.

**Steps:**
1. At the configured time (e.g., 6:00 PM), Pulse Co-Pilot sends a **Daily Recap Email**.
2. Open the email to review:
   - Aggregated metrics: total calls, answered/missed, sentiment breakdown.
   - List of all calls with one-line summaries.
   - Highlighted action items and top insights for the day.
3. If needed, click any call from the email to:
   - Open its details page in Pulse Co-Pilot.
   - Drill down for sentiment analysis and recommendations.

---

### Scenario 3: Daily Call Review
**Start:** Login → Dashboard  
**Check:** Daily metrics overview  
**Go to:** Call List → Filter & Search  
**Drill Down:** View Call Details  
**Review Emails:** Open Mail Box previews  
**Adjust:** Config settings if needed  

---

### Scenario 4: Email Configuration
- Navigate to **Configuration**.
- Modify subject lines, recipients, or intro text.
- Preview changes in real-time.
- Verify final format in **Mail Box**.

---

### Scenario 5: Call Analysis
- Access **Call List** from Dashboard.
- Apply filters to find important calls.
- Click for detailed analytics.
- Review sentiment and action items.



| **Feature**        | **Location**                 |
| ------------------ | ---------------------------- |
| Dashboard          | `/dashboard`                 |
| Call List          | `/calls`                     |
| Call Details       | `/calls/[id]`                |
| End-of-Call Config | `/configuration/end-of-call` |
| End-of-Day Config  | `/configuration/end-of-day`  |
| Email Previews     | `/mailbox/`                  |

