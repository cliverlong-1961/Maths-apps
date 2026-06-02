
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAsofJ-PWPpqjdKaKKNb1pJvoxaDHrvU_w",
  authDomain: "maths-apps-feedback.firebaseapp.com",
  databaseURL: "https://maths-apps-feedback-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "maths-apps-feedback",
  storageBucket: "maths-apps-feedback.firebasestorage.app",
  messagingSenderId: "122455032663",
  appId: "1:122455032663:web:a69c8a6927aa3c5b13f412",
  measurementId: "G-0BEL8RSMS2"
};

/* ── Initialise Firebase ─────────────────────────────────────
   The SDK is loaded via <script> tags in each HTML page before
   this file, so we call initializeApp directly here.          */
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

/* ── sendFeedback: called by feedback-widget.js ─────────── */
async function sendFeedback(entry) {
  if (!firebase.apps.length) {
    throw new Error('Firebase not initialised — check FIREBASE_CONFIG values in firebase-config.js');
  }
  const db  = firebase.database();
  const ref = db.ref('feedback');
  await ref.push(entry);
}

/* ──────────────────────────────────────────────────────────
   ALTERNATIVE: Formspree (simpler, no Firebase account needed)
   Replace the sendFeedback function above with this one,
   and sign up free at https://formspree.io to get your endpoint.
   Responses are emailed directly to maths-apps@crlong.uk.

async function sendFeedback(entry) {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body:    JSON.stringify(entry)
  });
  if (!res.ok) throw new Error('Formspree error ' + res.status);
}
   ────────────────────────────────────────────────────────── */
