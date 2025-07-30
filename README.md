# Pulse Co-Pilot – User Journey & Feature Guide. 

Welcome to Pulse Co-Pilot, your AI-powered call analytics and daily recap system that transforms conversations into actionable insights. This guide walks you through every feature and how to use it effectively.

## 📋 Getting Started

### 1. Login Experience
Url: /

What you'll see:

Clean, professional login interface with Pulse Co-Pilot branding

White-label ready (CSP logo placeholder)

Language toggle (EN / 日本語) for localization readiness

Demo Mode: Any credentials will work for testing

<img height="400" alt="image" src="https://github.com/user-attachments/assets/59c44509-c27a-4f08-baa5-1583120bd5d1" />



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

<img height="400" alt="image" src="https://github.com/user-attachments/assets/41fd8054-d6d5-4e29-bad1-7ec422631d47" />



### 3. Call List

Url : /calls

What you'll see:

Searchable table of all calls

Filters by call type and outcome

Sentiment badges (color-coded)

Click any row → View details

<img height="400" alt="image" src="https://github.com/user-attachments/assets/f9dbe11d-45f5-4318-bb9c-720630c2ed3f" />



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

<img height="400" alt="image" src="https://github.com/user-attachments/assets/adaa13f3-d18b-4e3e-8d56-1ae1fba0ebca" />


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

<img height="400" alt="image" src="https://github.com/user-attachments/assets/2f8db1b8-82bc-412c-acc1-ee8ac04918d1" />




## 6. End-of-Day Configuration

Url: /configuration/end-of-day

What you'll see:

Daily summary settings:

Subject

Intro text

Recipients

Send time

Preview of daily summary email layout

![Screenshot 2025-07-30 at 15 59 14](https://github.com/user-attachments/assets/e1db5407-7a7c-4edd-8f1f-581c2783360a)




### Mail Box (Email Previews)

### 7. End-of-Call Email Previews

Url: /mailbox/end-of-call

What you'll see:

Complete email templates with sample call data

Professional formatting and branding

<img height="400" alt="image" src="https://github.com/user-attachments/assets/4248ba29-fec4-4b73-85f6-02a461f0a9bf" />



### 8. End-of-Day Email Previews

Url: /mailbox/end-of-day

What you'll see:

Daily summary emails with:

Aggregated metrics

Key performance indicators

Action items

Email-ready templates for CSPs

<img height="400" alt="image" src="https://github.com/user-attachments/assets/62360088-9836-4bab-9192-0a7ba1fc23fd" />



### User Journey Scenarios

### Scenario 1: Daily Call Review

Start: Login → Dashboard

Check: Daily metrics overview

Go to: Call List → Filter & Search

Drill Down: View Call Details

Review Emails: Open Mail Box previews

Adjust: Config settings if needed

### Scenario 2: Email Configuration

Navigate to Configuration

Modify subject lines, recipients, or intro text

Preview changes in real-time

Verify final format in Mail Box

### Scenario 3: Call Analysis

Access Call List from Dashboard

Apply filters to find important calls

Click for detailed analytics

Review sentiment and action items

### Key Features by Location

| **Feature**        | **Location**                 |
| ------------------ | ---------------------------- |
| Dashboard          | `/dashboard`                 |
| Call List          | `/calls`                     |
| Call Details       | `/calls/[id]`                |
| End-of-Call Config | `/configuration/end-of-call` |
| End-of-Day Config  | `/configuration/end-of-day`  |
| Email Previews     | `/mailbox/`                  |

