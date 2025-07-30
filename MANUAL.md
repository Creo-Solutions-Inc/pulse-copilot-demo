# Pulse Co-Pilot - Daily Recap Demo

A Next.js clickable demo showcasing an AI-powered call analytics and daily recap system. This is a static mock demo that demonstrates the user interface and functionality without requiring real API integrations.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Font:** Inter (Google Fonts)
- **State Management:** React Hooks
- **Mock Data:** JSON files in `/src/data`

## 📁 Project Structure

```
pulse-copilot-demo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Main layout with sidebar
│   │   ├── page.tsx           # Login page
│   │   ├── dashboard/         # Dashboard overview
│   │   ├── configuration/     # Email configuration pages
│   │   ├── email-previews/    # Email preview pages
│   │   └── calls/            # Call list and details
│   ├── components/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   ├── Card.tsx
│   │   └── Sidebar.tsx
│   └── data/                 # Mock data files
│       ├── calls.json        # Call history data
│       └── config.json       # Email configuration
├── public/                   # Static assets
└── package.json
```

## 🎯 Features

### Pages Implemented

1. **Login Page** (`/`)
   - Pulse Co-Pilot branding
   - Username/password fields
   - Demo mode (any credentials work)

2. **Dashboard** (`/dashboard`)
   - 4 metric cards (Total Calls, Answered, Missed, Avg Duration)
   - Quick action cards
   - Recent calls list

3. **Configuration Pages**
   - **End-of-Call Config** (`/configuration/end-of-call`)
   - **End-of-Day Config** (`/configuration/end-of-day`)
   - Email subject, intro text, recipients, monitored numbers
   - Time picker for daily summaries

4. **Email Preview Pages**
   - **End-of-Call Preview** (`/email-previews/end-of-call`)
   - **End-of-Day Preview** (`/email-previews/end-of-day`)
   - Interactive previews with real data

5. **Call Management**
   - **Call List** (`/calls`) - Searchable table with filters
   - **Call Details** (`/calls/[id]`) - Individual call information

### Key Features

- **Responsive Design:** Works on desktop and mobile
- **Interactive Navigation:** Sticky sidebar with active states
- **Search & Filtering:** Call list with real-time filtering
- **Mock Data:** Realistic call data with sentiment analysis
- **Email Previews:** Live preview of email templates
- **Configuration Management:** Form-based settings

## 🎨 Design System

### Colors
- **Primary:** `#e1a730` (Yellow)
- **Header:** `#1e3653` (Dark Blue)
- **Background:** `#f8f9fa` (Light Gray)
- **Text:** Various grays for hierarchy

### Components
- **Button:** Primary, secondary, and outline variants
- **InputField:** Text, email, password, time, and textarea support
- **Card:** Reusable content containers
- **Sidebar:** Navigation with nested items

## 📊 Mock Data

### Calls Data (`/src/data/calls.json`)
```json
{
  "id": "1",
  "time": "2024-01-15T09:30:00Z",
  "internalNumber": "+1-555-0101",
  "externalNumber": "+1-555-0202",
  "callType": "Inbound",
  "callOutcome": "Completed",
  "sentiment": "Positive",
  "qualityScore": 85,
  "duration": "00:05:32",
  "summary": "Customer inquiry about product features...",
  "actionItems": ["Follow up with pricing proposal"]
}
```

### Configuration Data (`/src/data/config.json`)
```json
{
  "endOfCall": {
    "subject": "Call Summary - {callType} Call",
    "intro": "Here's a summary of your recent call...",
    "recipients": ["manager@company.com"],
    "monitoredNumbers": ["+1-555-0101"]
  }
}
```

## 🔧 Development Notes

### API Integration Points
The following areas are marked for real API integration:

1. **Login Authentication** (`/src/app/page.tsx`)
   ```typescript
   // TODO: Replace with real authentication API
   setTimeout(() => {
     router.push('/dashboard');
   }, 1000);
   ```

2. **Configuration Saving** (`/src/app/configuration/*/page.tsx`)
   ```typescript
   // TODO: Replace with real API call
   setTimeout(() => {
     setIsSaved(true);
   }, 1000);
   ```

3. **Call Data Loading** (`/src/app/calls/page.tsx`)
   ```typescript
   // TODO: Replace with real API call
   setCalls(callsData as CallData[]);
   ```

### Adding Real API Integration

1. **Authentication:**
   - Replace login timeout with real auth API
   - Add JWT token management
   - Implement protected routes

2. **Data Fetching:**
   - Replace JSON imports with API calls
   - Add loading states and error handling
   - Implement real-time updates

3. **Configuration:**
   - Connect to backend settings API
   - Add validation and error handling
   - Implement real-time sync

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify:** Compatible with Next.js
- **AWS Amplify:** Full-stack deployment
- **Docker:** Containerized deployment

## 📝 Future Enhancements

### Planned Features
- [ ] Real-time call monitoring
- [ ] Advanced analytics dashboard
- [ ] Email template editor
- [ ] Call recording playback
- [ ] User management system
- [ ] API documentation
- [ ] Unit tests
- [ ] E2E testing

### Technical Improvements
- [ ] Add React Query for data fetching
- [ ] Implement proper error boundaries
- [ ] Add loading skeletons
- [ ] Optimize bundle size
- [ ] Add PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is a demo and is not intended for production use without proper API integration and security measures.

---

**Note:** This is a demo application. In production, implement proper authentication, API security, and data validation.
