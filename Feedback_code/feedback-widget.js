/* ============================================================
   feedback-widget.js  —  Maths Apps Student Feedback Widget
   Include this script in every app page (after firebase-config.js)
   ============================================================ */

(function () {
  /* ── Styles ─────────────────────────────────────────────── */
  const css = `
    #fb-btn {
      position: fixed; bottom: 20px; right: 20px; z-index: 9998;
      display: inline-flex; align-items: center; gap: 8px;
      background: #1a2b4a; color: #f0c040;
      border: none; border-radius: 24px;
      padding: 10px 18px; cursor: pointer;
      font-family: Georgia, serif; font-size: 14px; font-weight: 500;
      box-shadow: 0 3px 12px rgba(0,0,0,0.30);
      transition: background 0.15s;
    }
    #fb-btn:hover { background: #243760; }
    #fb-backdrop {
      display: none; position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.45);
      align-items: center; justify-content: center;
    }
    #fb-backdrop.open { display: flex; }
    #fb-modal {
      background: #fff; border-radius: 12px;
      width: 380px; max-width: calc(100vw - 40px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.22);
      overflow: hidden; font-family: Georgia, serif;
    }
    #fb-modal-head {
      background: #1a2b4a; color: #f0c040;
      padding: 14px 18px; display: flex; align-items: center;
      justify-content: space-between;
    }
    #fb-modal-head h3 { margin: 0; font-size: 16px; font-weight: 500; }
    #fb-close-btn {
      background: none; border: none; color: #f0c040;
      font-size: 22px; cursor: pointer; line-height: 1; padding: 0;
    }
    #fb-modal-body { padding: 16px 18px; }
    #fb-url-display {
      background: #f5f5f0; border-radius: 6px;
      padding: 7px 12px; font-size: 11px; color: #666;
      font-family: monospace; margin-bottom: 14px;
      word-break: break-all; border: 1px solid #e0e0d8;
    }
    .fb-label {
      display: block; font-size: 13px;
      color: #444; margin-bottom: 6px;
    }
    #fb-type-row { display: flex; gap: 8px; margin-bottom: 14px; }
    .fb-type-btn {
      flex: 1; padding: 7px 4px; border: 1.5px solid #ccc;
      background: #fff; border-radius: 6px; cursor: pointer;
      font-size: 12px; font-family: Georgia, serif; color: #444;
      transition: all 0.15s; text-align: center;
    }
    .fb-type-btn.active {
      border-color: #1a2b4a; background: #eef1f7;
      color: #1a2b4a; font-weight: 600;
    }
    #fb-text {
      width: 100%; min-height: 90px; resize: vertical;
      border: 1.5px solid #ccc; border-radius: 6px;
      padding: 9px 10px; font-family: Georgia, serif;
      font-size: 14px; color: #222; box-sizing: border-box;
    }
    #fb-text:focus { outline: none; border-color: #1a2b4a; }
    #fb-char-count {
      text-align: right; font-size: 11px;
      color: #999; margin-top: 4px;
    }
    #fb-footer {
      padding: 12px 18px 16px;
      display: flex; justify-content: flex-end; gap: 10px;
      border-top: 1px solid #eee;
    }
    #fb-cancel-btn {
      background: none; border: 1px solid #ccc; color: #555;
      padding: 8px 18px; border-radius: 6px; cursor: pointer;
      font-family: Georgia, serif; font-size: 14px;
    }
    #fb-submit-btn {
      background: #1a2b4a; color: #f0c040; border: none;
      padding: 8px 22px; border-radius: 6px; cursor: pointer;
      font-family: Georgia, serif; font-size: 14px; font-weight: 500;
    }
    #fb-submit-btn:hover { background: #243760; }
    #fb-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    #fb-success {
      text-align: center; padding: 28px 18px;
      font-family: Georgia, serif; color: #1a2b4a;
    }
    #fb-success .fb-tick { font-size: 38px; margin-bottom: 10px; }
    #fb-success p { margin: 0; font-size: 15px; }
    #fb-error-msg {
      color: #c0392b; font-size: 12px;
      margin-top: 6px; display: none;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── HTML ────────────────────────────────────────────────── */
  const html = `
    <button id="fb-btn" aria-label="Leave feedback">
      &#128172; Feedback
    </button>

    <div id="fb-backdrop" role="dialog" aria-modal="true" aria-labelledby="fb-modal-title">
      <div id="fb-modal">
        <div id="fb-modal-head">
          <h3 id="fb-modal-title">Leave feedback</h3>
          <button id="fb-close-btn" aria-label="Close feedback form">&times;</button>
        </div>
        <div id="fb-modal-body">
          <div id="fb-url-display"></div>
          <span class="fb-label">What kind of feedback?</span>
          <div id="fb-type-row">
            <button class="fb-type-btn active" data-type="question">&#10067; Question</button>
            <button class="fb-type-btn" data-type="error">&#128027; Error found</button>
            <button class="fb-type-btn" data-type="suggestion">&#128161; Suggestion</button>
          </div>
          <span class="fb-label">Your comment</span>
          <textarea id="fb-text" maxlength="500"
            placeholder="E.g. I don&#39;t understand why the normal reaction is zero in step 3&#8230;"></textarea>
          <div id="fb-char-count">0 / 500</div>
          <div id="fb-error-msg">Please write a comment before sending.</div>
        </div>
        <div id="fb-footer">
          <button id="fb-cancel-btn">Cancel</button>
          <button id="fb-submit-btn">Send &#8599;</button>
        </div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  /* ── State ───────────────────────────────────────────────── */
  let selectedType = 'question';
  const backdrop   = document.getElementById('fb-backdrop');
  const modal      = document.getElementById('fb-modal');
  const textarea   = document.getElementById('fb-text');
  const charCount  = document.getElementById('fb-char-count');
  const errorMsg   = document.getElementById('fb-error-msg');
  const submitBtn  = document.getElementById('fb-submit-btn');

  document.getElementById('fb-url-display').textContent = window.location.href;

  /* ── Type selector ───────────────────────────────────────── */
  document.getElementById('fb-type-row').addEventListener('click', function (e) {
    const btn = e.target.closest('.fb-type-btn');
    if (!btn) return;
    document.querySelectorAll('.fb-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedType = btn.dataset.type;
  });

  /* ── Character counter ───────────────────────────────────── */
  textarea.addEventListener('input', function () {
    charCount.textContent = textarea.value.length + ' / 500';
    if (textarea.value.trim()) errorMsg.style.display = 'none';
  });

  /* ── Open / close ────────────────────────────────────────── */
  document.getElementById('fb-btn').addEventListener('click', () => {
    backdrop.classList.add('open');
    textarea.focus();
  });

  function resetForm() {
    document.getElementById('fb-modal-body').innerHTML = `
      <div id="fb-url-display"></div>
      <span class="fb-label">What kind of feedback?</span>
      <div id="fb-type-row">
        <button class="fb-type-btn active" data-type="question">&#10067; Question</button>
        <button class="fb-type-btn" data-type="error">&#128027; Error found</button>
        <button class="fb-type-btn" data-type="suggestion">&#128161; Suggestion</button>
      </div>
      <span class="fb-label">Your comment</span>
      <textarea id="fb-text" maxlength="500"
        placeholder="E.g. I don&#39;t understand why the normal reaction is zero in step 3&#8230;"></textarea>
      <div id="fb-char-count">0 / 500</div>
      <div id="fb-error-msg" style="color:#c0392b;font-size:12px;margin-top:6px;display:none;">Please write a comment before sending.</div>`;
    document.getElementById('fb-url-display').textContent = window.location.href;
    document.getElementById('fb-footer').style.display = 'flex';

    /* Re-bind textarea events after DOM reset */
    const ta  = document.getElementById('fb-text');
    const cc  = document.getElementById('fb-char-count');
    const em  = document.getElementById('fb-error-msg');
    ta.addEventListener('input', function () {
      cc.textContent = ta.value.length + ' / 500';
      if (ta.value.trim()) em.style.display = 'none';
    });

    selectedType = 'question';

    /* Reset submit button — it may have been disabled/relabelled during send */
    const sb = document.getElementById('fb-submit-btn');
    if (sb) { sb.disabled = false; sb.textContent = 'Send ↗'; }
  }

  function closeModal() {
    backdrop.classList.remove('open');
    resetForm();
  }

  document.getElementById('fb-close-btn').addEventListener('click', closeModal);
  document.getElementById('fb-cancel-btn').addEventListener('click', closeModal);

  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Submit ──────────────────────────────────────────────── */
  document.getElementById('fb-submit-btn').addEventListener('click', async function () {
    const comment = textarea.value.trim();
    if (!comment) {
      errorMsg.style.display = 'block';
      textarea.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const entry = {
      url:       window.location.href,
      page:      window.location.pathname.split('/').pop() || 'index',
      type:      selectedType,
      comment:   comment,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 80)
    };

    try {
      await sendFeedback(entry);   /* defined in firebase-config.js */
      showSuccess();
    } catch (err) {
      console.error('Feedback send error:', err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send ↗';
      errorMsg.textContent = 'Could not send — please try again.';
      errorMsg.style.display = 'block';
    }
  });

  function showSuccess() {
    document.getElementById('fb-modal-body').innerHTML =
      '<div id="fb-success"><div class="fb-tick">&#10003;</div><p>Thanks! Your feedback has been sent to Dr Long.</p></div>';
    document.getElementById('fb-footer').style.display = 'none';
    setTimeout(closeModal, 2200);
  }

})();
