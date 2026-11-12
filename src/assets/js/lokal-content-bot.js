const WEBHOOK = window.N8N_WEBHOOK_URL || null;
const input   = document.getElementById('lcb-input');
const btn     = document.getElementById('lcb-btn');
const errBox  = document.getElementById('lcb-error');
const loader  = document.getElementById('lcb-loading');
const output  = document.getElementById('lcb-output');

function show(el){ el.style.display = el.classList.contains('lcb-output') ? 'flex' : 'block'; }
function hide(el){ el.style.display = 'none'; }
function reset(){ hide(errBox); hide(loader); hide(output); }

btn.addEventListener('click', async () => {
  const topic = input.value.trim();
  if (!topic) return;
  reset();
  btn.disabled = true;
  show(loader);
  try {
    let blog = '', instagram = '';
    if (WEBHOOK) {
      const res  = await fetch(WEBHOOK, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ topic }) });
      if (!res.ok) throw new Error('Webhook Fehler: ' + res.status);
      const data = await res.json();
      blog = data.blog || data.blogpost || '';
      instagram = data.instagram || data.caption || '';
    } else {
      throw new Error('Die Demo ist derzeit nicht verfügbar. Bitte nutzen Sie die Live-Demo unter lcb.pixelriverstudio.de.');
    }
    document.getElementById('lcb-blog-text').textContent  = blog;
    document.getElementById('lcb-insta-text').textContent = instagram;
    hide(loader);
    show(output);
  } catch(e) {
    hide(loader);
    errBox.textContent = WEBHOOK ? 'Fehler: ' + e.message : e.message;
    show(errBox);
  } finally {
    btn.disabled = false;
  }
});

input.addEventListener('keydown', e => { if(e.key === 'Enter') btn.click(); });

document.querySelectorAll('.lcb-copy-btn').forEach(b => {
  b.addEventListener('click', () => {
    const text = document.getElementById(b.dataset.target).textContent;
    navigator.clipboard.writeText(text).then(() => {
      const orig = b.textContent;
      b.textContent = '✓ Kopiert';
      setTimeout(() => { b.textContent = orig; }, 2000);
    });
  });
});
