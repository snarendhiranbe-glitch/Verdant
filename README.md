# Verdant Finance Website

Verdant is a responsive finance-website frontend built with HTML, CSS, and JavaScript. It presents financial plans, investment information, customer support, enquiry handling, login options, and an administrative enquiry list.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `Home.html` | Main landing page, company introduction, market views, plans, services, support link, and footer |
| Services | `Services.html` | Financial services overview |
| Customer Support | `Support.html` | Technical help, advanced support, FAQ search, and support actions |
| Login | `Login.html` | Customer and administrator login options |
| Enquiry | `Enquiry.html` | Customer contact and enquiry form |
| Enquiries | `Enquiries.html` | Protected administrator view of saved enquiries |
| Investor Relations | `InvestorRelations.html` | Investor information and financial highlights |
| Corporate Calendar | `CorporateCalendar.html` | Company events and financial milestones |
| Sustainability | `Sustainability.html` | Sustainability and responsible-investment information |
| Annual Reporting | `AnnualReporting.html` | Annual report and governance information |

## Main Features

- Responsive desktop and mobile design
- Fixed transparent navigation header
- Animated backgrounds, chart lines, cards, and scroll reveals
- Investment and retirement overview cards
- Financial market-data display
- Four financial-service tiles
- Newsletter subscription confirmation
- Customer and administrator login selection
- Customer forgot-password email/mobile verification demonstration
- Strong administrator-password validation
- Enquiry form validation
- Country and calling-code synchronization
- Protected administrator enquiries page
- Per-enquiry telephone call link
- Individual enquiry deletion and clear-all actions
- Support topic search and FAQ accordion

## Technology

- HTML5 for structure
- CSS3 for layout, animation, responsiveness, and visual design
- JavaScript for interaction and browser-side validation
- `localStorage` for demo enquiry storage
- `sessionStorage` for demo login-session state
- No backend, database, or external server dependency

## JavaScript Files

### `verdant-app.js`

Provides shared behavior across the website:

- Customer and administrator login handling
- Login role switching
- Customer forgot-password verification
- Strong administrator-password validation
- Enquiry validation and submission
- Saving enquiries in `localStorage`
- Country/calling-code synchronization
- Smooth navigation to page anchors
- Newsletter confirmation
- Social-link handling
- Shared page initialization

### Page-level JavaScript

- `Home.html` contains header scroll behavior, mobile navigation, home and newsletter form handling, page reload positioning, and scroll reveal setup.
- `Support.html` contains support-topic routing and FAQ accordion behavior.
- `Enquiries.html` contains the protected enquiry-list rendering, delete, clear-all, and telephone-link logic.

## Running the Website

Open `Home.html` directly in a browser, or run a local server for the most reliable experience.

From the Verdant project folder:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/Home.html
```

## Login Credentials

### Customer Demo

Customer login accepts a valid email address and a password of at least eight characters.

Example:

```text
Email: customer@example.com
Password: customer123
```

A customer login redirects to `Home.html`.

### Administrator Demo

```text
Username: VerdantAdmin
Password: Verdant@Admin123
```

An administrator login redirects to `Enquiries.html`.

The admin password is designed to demonstrate uppercase, lowercase, number, and symbol requirements.

## Enquiry Testing

1. Open `Enquiry.html` directly or select **Contact us** on the home page.
2. Enter an email, contact number, address, state, and country.
3. Select a country to synchronize the calling code.
4. Submit the form.
5. Open `Enquiries.html` after administrator login.
6. Test **Call**, **Delete**, and **Clear all**.

Enquiry data is stored only in the current browser under:

```text
localStorage key: verdantEnquiries
```

Clearing browser storage or using another browser/device will remove or hide those enquiries.

## Support Testing

1. Open `Support.html`.
2. Search for terms such as `login`, `security`, `portfolio`, or `advisor`.
3. Confirm that the relevant support section receives focus.
4. Expand the FAQ items.
5. Test the technical and specialist enquiry links.

## Important Static-Demo Limitations

- There is no real backend or database.
- Login credentials are demonstration values held in JavaScript.
- Admin route protection uses `sessionStorage` and can be bypassed by editing browser code or storage.
- Enquiries are not sent to an email or server.
- Forgot-password codes are simulated and do not send real SMS or email messages.
- Newsletter submissions only display an on-page confirmation.
- Telephone buttons require a supported device or calling application.

For a production finance website, authentication, password storage, enquiry submissions, newsletter delivery, and admin authorization must use a secure server and database. Passwords must be hashed, verification codes must be generated by the server, and all protected routes and data operations must be authorized server-side.
