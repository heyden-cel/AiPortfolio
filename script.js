// Persistent Auth State
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let currentUserEmail = localStorage.getItem('currentUserEmail') || '';
let pendingGeneration = false;

// State variables
let currentView = isLoggedIn ? 'landing' : 'auth';
let wizardStep = 1;
let isLoginMode = true;
let formData = {
  role: '',
  skills: '',
  aesthetic: 'Dark & Modern',
  layout: 'Bento Grid',
  colorPalette: 'Deep Space (Dark)',
  typography: 'System Default',
  image: null,
  bio: '',
  socialGithub: '',
  socialLinkedin: ''
};

// Persistent Auth State
// (Moved up to support initial currentView)

// Data models
const templates = [
  { title: 'Black White Grayscale Portfolio', author: 'AIFolio Engine', config: { aesthetic: 'Minimalist Monospace', layout: 'Bento Grid', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#111', text: '#fff', b1: '#333', b2: '#222' } },
  { title: 'Design Portfolio and Resume', author: 'Creative Labs', config: { aesthetic: 'Dark & Modern', layout: 'Classic Hero & Sections', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#0A1929', text: '#66B2FF', b1: '#001E3C', b2: '#0D2339' } },
  { title: 'Black and Orange Bold Creative', author: 'Studio X', config: { aesthetic: 'Vibrant Neo-Brutalism', layout: 'Fullscreen Interactive', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#1c1c1c', text: '#ff5500', b1: '#333', b2: '#ff5500' } },
  { title: 'Black and White Simple Portfolio', author: 'Minimalist Inc', config: { aesthetic: 'Minimalist Monospace', layout: 'Classic Hero & Sections', colorPalette: 'Muted Earth' }, ui: { bg: '#E5E5E5', text: '#000', b1: '#D4D4D4', b2: '#fff' } },
  { title: 'Beige and Brown Minimalist', author: 'Juliana Silva', config: { aesthetic: 'Dark & Modern', layout: 'Bento Grid', colorPalette: 'Muted Earth' }, ui: { bg: '#f5ebe0', text: '#4a3f35', b1: '#e3d5ca', b2: '#d6ccc2' } },
  { title: 'White and Orange Simple Portfolio', author: 'Olivia Wilson', config: { aesthetic: 'Vibrant Neo-Brutalism', layout: 'Classic Hero & Sections', colorPalette: 'Muted Earth' }, ui: { bg: '#ffffff', text: '#ff7b00', b1: '#f8f9fa', b2: '#ffea00' } },
  { title: 'Black Aesthetic Education', author: 'EduTech', config: { aesthetic: 'Dark & Modern', layout: 'Fullscreen Interactive', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#0a0a0a', text: '#e0e0e0', b1: '#1a1a1a', b2: '#222' } },
  { title: 'Beige Modern with Abstract', author: 'Olivia Wilson', config: { aesthetic: 'Dark & Modern', layout: 'Classic Hero & Sections', colorPalette: 'Muted Earth' }, ui: { bg: '#eae0d5', text: '#212529', b1: '#c6ac8f', b2: '#5e503f' } },
  { title: 'Brown and White Minimalist', author: 'Studio X', config: { aesthetic: 'Minimalist Monospace', layout: 'Bento Grid', colorPalette: 'Muted Earth' }, ui: { bg: '#4a3f35', text: '#f5ebe0', b1: '#5e503f', b2: '#c6ac8f' } },
  { title: 'Brown Red Scrapbook Portfolio', author: 'Creative Labs', config: { aesthetic: 'Vibrant Neo-Brutalism', layout: 'Bento Grid', colorPalette: 'Muted Earth' }, ui: { bg: '#fdf0d5', text: '#c1121f', b1: '#fbc3bc', b2: '#780000' } },
  { title: 'Black and Pink Modern Portfolio', author: 'Juliana Silva', config: { aesthetic: 'Dark & Modern', layout: 'Fullscreen Interactive', colorPalette: 'Cyberpunk Neon' }, ui: { bg: '#0b090a', text: '#ff0a54', b1: '#161214', b2: '#ff477e' } },
  { title: 'Black and White Minimalist Photo', author: 'Olivia Wilson', config: { aesthetic: 'Minimalist Monospace', layout: 'Fullscreen Interactive', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#111', text: '#fff', b1: '#222', b2: '#333' } }
];

const showcaseData = [
  { id: 1, name: 'Alex J.', role: 'Fullstack Engineer', tags: ['React', 'Node.js', 'ThreeJS'], desc: 'A high-contrast, high-impact bento box layout built for an elite creative developer.', palette: 'Cyberpunk Neon', bg: '#090014', color: '#00fff5', tagBg: 'rgba(255, 0, 128, 0.2)', tagColor: '#ff0080' },
  { id: 2, name: 'Sarah M.', role: 'UX/UI Designer', tags: ['Figma', 'Research'], desc: 'An elegant, breathable classic layout focusing on rich typography and case studies.', palette: 'Muted Earth', bg: '#1A1814', color: '#d4a373', tagBg: 'rgba(212, 163, 115, 0.2)', tagColor: '#d4a373' },
  { id: 3, name: 'Jordan K.', role: 'Product Manager', tags: ['Strategy', 'Agile'], desc: 'A stealth-mode dark aesthetic designed for presenting metrics and vision with impact.', palette: 'Deep Space', bg: '#0a0a0a', color: '#fff', tagBg: 'rgba(139, 92, 246, 0.2)', tagColor: 'var(--accent-secondary)' }
];

const dashboardProjects = [
  { id: 1, title: 'Neo-Brutalism Designer Folio', date: 'Oct 12, 2023', views: 342, status: 'Published', config: { role: 'Product Designer', skills: 'Figma, Prototyping, CSS', aesthetic: 'Vibrant Neo-Brutalism', layout: 'Bento Grid', colorPalette: 'Cyberpunk Neon', bio: 'Living on the edge of design and brutalist architecture.' } },
  { id: 2, title: 'Dark Mode Developer Folio', date: 'Aug 04, 2023', views: 1045, status: 'Published', config: { role: 'Fullstack Developer', skills: 'React, Node.js, AWS', aesthetic: 'Dark & Modern', layout: 'Classic Hero & Sections', colorPalette: 'Deep Space (Dark)', bio: 'Architecting the web with clean code and dark mode aesthetics.' } },
  { id: 3, title: 'Clean Architecture Test', date: 'Jul 21, 2023', views: 12, status: 'Draft', config: { role: 'Software Engineer', skills: 'Go, Kubernetes, Redis', aesthetic: 'Minimalist Monospace', layout: 'Fullscreen Interactive', colorPalette: 'Muted Earth', bio: 'Efficiency and scalability first.' } }
];

// Initialization - direct call since script is at the bottom of body
renderTemplates();
renderShowcase();
renderDashboardList();
updateNavbar();
navigate(currentView);

// View Navigation
function navigate(viewName) {
    // If navigating to landing, update navbar just in case
    if (viewName === 'landing') updateNavbar();
    
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    const target = document.getElementById('view-' + viewName);
    if(target) {
        target.style.display = 'block';
        // force reflow
        void target.offsetWidth;
        target.classList.add('active');
    }
    window.scrollTo(0,0);

    if (viewName === 'dashboard') {
        updateDashboardNav();
    }
    if (viewName === 'profile') {
        renderProfile();
    }
}

function updateDashboardNav() {
    const navActions = document.getElementById('dashboard-nav-actions');
    if (!navActions) return;

    // Check if we should add admin hub button
    const isAdmin = currentUserEmail === 'admin@gmail.com';
    const existingAdminBtn = document.getElementById('btn-admin-hub-dashboard');
    
    if (isAdmin && !existingAdminBtn) {
        const btn = document.createElement('button');
        btn.id = 'btn-admin-hub-dashboard';
        btn.className = 'btn-secondary';
        btn.onclick = () => navigate('admin');
        btn.innerHTML = '✦ Admin Hub';
        btn.style.cssText = 'padding: 8px 24px; font-size: 0.9rem; border: 1px solid #ff0080; color: #ff0080; background: rgba(255, 0, 128, 0.05);';
        navActions.prepend(btn);
    } else if (!isAdmin && existingAdminBtn) {
        existingAdminBtn.remove();
    }
}

// Rendering HTML
function renderTemplates() {
    const grid = document.getElementById('templates-grid');
    if (!grid) {
        console.error('templates-grid not found');
        return;
    }
    console.log('Rendering templates...', templates.length);
    grid.innerHTML = templates.map((tpl, i) => `
        <div class="template-card animate-fade" style="animation-delay: ${i * 0.05}s; cursor: pointer;"
             onmouseenter="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 30px ${tpl.ui.text}20'; this.querySelector('.hover-overlay').style.opacity='1'"
             onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.querySelector('.hover-overlay').style.opacity='0'">
          <div style="aspect-ratio: 16/10; background: ${tpl.ui.bg}; border-radius: 12px; padding: 1.5rem; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; gap: 10px;">
              <div style="width: 40px; height: 40px; background: ${tpl.ui.b1}; border-radius: 50%;"></div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 6px; justify-content: center;">
                <div style="width: 60%; height: 8px; background: ${tpl.ui.text}; opacity: 0.8; border-radius: 4px;"></div>
                <div style="width: 40%; height: 6px; background: ${tpl.ui.text}; opacity: 0.5; border-radius: 4px;"></div>
              </div>
            </div>
            <div style="text-align: center;">
              <h3 style="margin: 0; font-size: clamp(1.2rem, 2vw, 1.8rem); color: ${tpl.ui.text}; letter-spacing: -1px; font-weight: 800; font-family: ${tpl.title.includes('Monospace') ? 'monospace' : 'inherit'};">PORTFOLIO</h3>
            </div>
          </div>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
             <div style="width: 30%; height: 6px; background: ${tpl.ui.b2}; border-radius: 4px;"></div>
             <div style="width: 20%; height: 6px; background: ${tpl.ui.b1}; border-radius: 4px;"></div>
          </div>
          <div class="hover-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s ease-in-out;">
             <button class="btn-primary" onclick="event.stopPropagation(); startWizard('${encodeURIComponent(JSON.stringify(tpl.config))}')" style="padding: 10px 24px; font-size: 0.9rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">Use Template</button>
          </div>
        </div>
          <div style="margin-top: 1rem; padding: 0 0.5rem;">
            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tpl.title}</h4>
            <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #888;">${tpl.author}</p>
          </div>
        </div>
    `).join('');
}

function renderShowcase() {
    const grid = document.getElementById('showcase-grid');
    if (!grid) {
        console.error('showcase-grid not found');
        return;
    }
    grid.innerHTML = showcaseData.map((item, i) => `
      <div class="glass-panel animate-fade${i > 0 ? '-delay-'+i : ''}" style="padding: 0; overflow: hidden; text-align: left; transition: all 0.3s ease; cursor: pointer; border: 1px solid rgba(255,255,255,0.05);"
           onmouseenter="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 15px 30px ${item.tagBg}'"
           onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
        <div style="height: 220px; background: ${item.bg}; padding: 2rem; display: flex; flex-direction: column; justify-content: center; border-bottom: 1px solid var(--glass-border); position: relative;">
           <div style="position: absolute; top: 1rem; right: 1rem; background: ${item.tagBg}; color: ${item.tagColor}; font-size: 0.75rem; padding: 6px 10px; border-radius: 6px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">${item.palette}</div>
           <h3 style="font-size: 2.5rem; color: ${item.color}; margin: 0; letter-spacing: -1px;">${item.name}</h3>
           <p style="color: #888; margin-top: 0.5rem; font-size: 1.1rem;">${item.role}</p>
        </div>
        <div style="padding: 1.5rem 2rem 2rem;">
          <div style="display: flex; gap: 10px; margin-bottom: 1.2rem;">
             ${item.tags.map(tag => `<span style="font-size: 0.85rem; padding: 6px 14px; background: rgba(255,255,255,0.05); border-radius: 20px; color: #ccc;">${tag}</span>`).join('')}
          </div>
          <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">${item.desc}</p>
        </div>
      </div>
    `).join('');
}

function renderDashboardList() {
    const list = document.getElementById('dashboard-list');
    const countEl = document.getElementById('dashboard-count');
    if (countEl) countEl.innerText = `You have ${dashboardProjects.length} existing projects.`;
    
    if (!list) return;
    
    if (dashboardProjects.length === 0) {
        list.innerHTML = `<div style="text-align: center; padding: 4rem; color: var(--text-secondary);">You haven't generated any portfolios yet.</div>`;
        return;
    }

    list.innerHTML = dashboardProjects.map(work => {
        const statusBg = work.status === 'Published' ? 'rgba(39, 201, 63, 0.15)' : 'rgba(255, 189, 46, 0.15)';
        const statusColor = work.status === 'Published' ? '#27c93f' : '#ffbd2e';
        return `
        <div class="glass-panel" onclick="openProject(${work.id})" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; transition: all 0.2s; cursor: pointer; border: 1px solid rgba(255,255,255,0.05);"
             onmouseenter="this.style.background='rgba(255,255,255,0.08)'" onmouseleave="this.style.background='var(--glass-bg)'">
          <div style="display: flex; align-items: center; gap: 2rem;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--accent-primary); opacity: 0.8; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: bold;">
              ${work.title.charAt(0)}
            </div>
            <div>
              <h3 style="font-size: 1.2rem; margin: 0 0 0.4rem 0;">${work.title}</h3>
              <div style="display: flex; gap: 1rem; color: var(--text-secondary); font-size: 0.85rem;">
                <span>Created: ${work.date}</span><span>•</span><span>${work.views} Views</span>
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <span style="padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; background: ${statusBg}; color: ${statusColor};">${work.status}</span>
            <button class="btn-secondary" style="padding: 6px 16px; font-size: 0.85rem;" onclick="event.stopPropagation(); alert('Source code download logic goes here')">View Source</button>
          </div>
        </div>`;
    }).join('');
}

function openProject(id) {
    const project = dashboardProjects.find(p => p.id === id);
    if (!project) return;
    
    // Load config into formData
    formData = { ...formData, ...project.config };
    
    // Show result view
    document.getElementById('wizard-form-container').style.display = 'none';
    document.getElementById('wizard-generating-container').style.display = 'none';
    document.getElementById('wizard-result-container').style.display = 'block';
    
    navigate('wizard');
    renderWizardResult();
}

function updateNavbar() {
    const navContainer = document.getElementById('nav-auth-container');
    if (!navContainer) return;

    if (isLoggedIn) {
        navContainer.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button class="btn-secondary" onclick="navigate('profile')" style="padding: 8px 24px; font-size: 0.9rem;">Profile</button>
                <button class="btn-secondary" onclick="navigate('dashboard')" style="padding: 8px 24px; font-size: 0.9rem;">Dashboard</button>
                <button class="btn-secondary" onclick="logout()" style="padding: 8px 20px; font-size: 0.9rem; background: rgba(255,255,255,0.05);">Log Out</button>
            </div>
        `;
    } else {
        navContainer.innerHTML = `
            <button id="btn-login-main" class="btn-secondary" onclick="navigate('auth')" style="padding: 8px 24px; font-weight: 600;">Sign In</button>
        `;
    }
}

function login() {
    isLoggedIn = true;
    currentUserEmail = document.getElementById('auth-submit-btn').parentElement.querySelector('input[type="email"]').value || '';
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserEmail', currentUserEmail);
    updateNavbar();
    
    if (pendingGeneration) {
        pendingGeneration = false;
        navigate('wizard');
        renderWizardStep();
    } else {
        navigate('landing');
    }
}

function logout() {
    isLoggedIn = false;
    currentUserEmail = '';
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('currentUserEmail', '');
    updateNavbar();
    navigate('landing');
}

// Profile Handlers
function renderProfile() {
    const container = document.getElementById('profile-container');
    if (!container) return;

    const saved = localStorage.getItem('userProfile');
    const profile = saved ? JSON.parse(saved) : {
        name: 'Heyden Cel',
        role: 'Enterprise Architect',
        bio: 'Pioneering the next generation of AI-driven interfaces with high-performance engines and glassmorphism design.',
        github: 'heyden-cel',
        linkedin: 'heyden-cel',
        twitter: 'heyden_cel',
        location: 'Silicon Valley, CA'
    };

    container.innerHTML = `
      <nav class="glass-panel" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; padding: 1rem 2rem; border-radius: 15px;">
        <div style="display: flex; align-items: center; gap: 1rem;">
           <h2 style="font-size: 1.5rem; font-weight: bold;">My Profile</h2>
           <span style="background: rgba(121, 40, 202, 0.2); color: var(--accent-secondary); padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; text-transform: uppercase;">Verified</span>
        </div>
        <button class="btn-secondary" onclick="navigate('dashboard')" style="padding: 8px 24px; font-size: 0.9rem;">← Dashboard</button>
      </nav>

      <div style="max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: minmax(250px, 1fr) 2fr; gap: 2rem;">
        <div class="glass-panel" style="padding: 2.5rem 2rem; text-align: center; height: fit-content; border-top: 4px solid var(--accent-secondary);">
          <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 1.5rem auto;">
            <div style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary)); display: flex; align-items: center; justify-content: center; fontSize: 3rem; fontWeight: 800; border: 4px solid rgba(255,255,255,0.1);">
              ${profile.name.charAt(0)}
            </div>
            <div style="position: absolute; bottom: 5px; right: 5px; width: 28px; height: 28px; background: #27c93f; border-radius: 50%; border: 3px solid #000;"></div>
          </div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">${profile.name}</h2>
          <p style="color: var(--accent-secondary); font-weight: 600; font-size: 0.95rem; margin-bottom: 1.5rem;">${profile.role}</p>
          <div style="display: flex; flex-direction: column; gap: 0.8rem; text-align: left; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px;">
             <div style="display: flex; align-items: center; gap: 10px; fontSize: 0.85rem;">
                <span style="color: var(--text-secondary);">📧</span> <span>${currentUserEmail || 'heyden@example.com'}</span>
             </div>
             <div style="display: flex; align-items: center; gap: 10px; fontSize: 0.85rem;">
                <span style="color: var(--text-secondary);">📍</span> <span>${profile.location}</span>
             </div>
          </div>
          <button class="btn-primary" onclick="toggleProfileEdit()" style="width: 100%; margin-top: 2rem; padding: 12px;">Edit Identity</button>
        </div>

        <div id="profile-details-card" class="glass-panel" style="padding: 2.5rem;">
           <h3 style="font-size: 1.5rem; marginBottom: 1rem; letterSpacing: -0.5px;">About Me</h3>
           <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.1rem; margin-bottom: 3rem;">${profile.bio}</p>
           <h3 style="font-size: 1.5rem; marginBottom: 1.5rem; letterSpacing: -0.5px;">Social Presence</h3>
           <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
              <div class="glass-panel" style="padding: 1rem 1.5rem; flex: 1; min-width: 200px;">
                 <p style="color: var(--text-secondary); fontSize: 0.8rem; marginBottom: 0.5rem; fontWeight: 600;">GITHUB</p>
                 <p style="fontSize: 1rem; fontWeight: 700;">github.com/${profile.github}</p>
              </div>
              <div class="glass-panel" style="padding: 1rem 1.5rem; flex: 1; min-width: 200px;">
                 <p style="color: var(--text-secondary); fontSize: 0.8rem; marginBottom: 0.5rem; fontWeight: 600;">LINKEDIN</p>
                 <p style="fontSize: 1rem; fontWeight: 700;">linkedin.com/in/${profile.linkedin}</p>
              </div>
           </div>
        </div>
      </div>
    `;
}

function toggleProfileEdit() {
    const card = document.getElementById('profile-details-card');
    const saved = localStorage.getItem('userProfile');
    const profile = saved ? JSON.parse(saved) : { name: 'Heyden Cel', role: 'Enterprise Architect', bio: 'Pioneering the next generation of AI-driven interfaces with high-performance engines and glassmorphism design.', github: 'heyden-cel', linkedin: 'heyden-cel', twitter: 'heyden_cel', location: 'Silicon Valley, CA' };

    card.innerHTML = `
        <div class="animate-fade" style="display: flex; flex-direction: column; gap: 1.5rem;">
               <div>
                  <label style="display: block; marginBottom: 0.6rem; fontSize: 0.9rem; color: var(--text-secondary); fontWeight: 600;">Full Name</label>
                  <input type="text" id="edit-profile-name" class="neo-input" value="${profile.name}">
               </div>
               <div>
                  <label style="display: block; marginBottom: 0.6rem; fontSize: 0.9rem; color: var(--text-secondary); fontWeight: 600;">Professional Headline</label>
                  <input type="text" id="edit-profile-role" class="neo-input" value="${profile.role}">
               </div>
               <div>
                  <label style="display: block; marginBottom: 0.6rem; fontSize: 0.9rem; color: var(--text-secondary); fontWeight: 600;">Professional Bio</label>
                  <textarea id="edit-profile-bio" class="neo-input" rows="4" style="resize: none;">${profile.bio}</textarea>
               </div>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <label style="display: block; marginBottom: 0.6rem; fontSize: 0.8rem; color: var(--text-secondary);">GitHub</label>
                    <input type="text" id="edit-profile-github" class="neo-input" value="${profile.github}">
                  </div>
                  <div>
                    <label style="display: block; marginBottom: 0.6rem; fontSize: 0.8rem; color: var(--text-secondary);">LinkedIn</label>
                    <input type="text" id="edit-profile-linkedin" class="neo-input" value="${profile.linkedin}">
                  </div>
               </div>
               <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                  <button class="btn-primary" onclick="saveProfile()" style="padding: 12px 32px;">Save Profile</button>
                  <button class="btn-secondary" onclick="renderProfile()" style="padding: 12px 32px;">Cancel</button>
               </div>
        </div>
    `;
}

function saveProfile() {
    const updated = {
        name: document.getElementById('edit-profile-name').value,
        role: document.getElementById('edit-profile-role').value,
        bio: document.getElementById('edit-profile-bio').value,
        github: document.getElementById('edit-profile-github').value,
        linkedin: document.getElementById('edit-profile-linkedin').value,
        twitter: 'heyden_cel',
        location: 'Silicon Valley, CA'
    };
    localStorage.setItem('userProfile', JSON.stringify(updated));
    renderProfile();
}

// Auth Handlers
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? 'Welcome back' : 'Create an account';
    document.getElementById('auth-subtitle').innerText = isLoginMode ? 'Enter your details to access your portfolios.' : 'Start building your professional presence today.';
    document.getElementById('auth-name-field').style.display = isLoginMode ? 'none' : 'block';
    document.getElementById('auth-submit-btn').innerText = isLoginMode ? 'Sign In' : 'Create Account';
    document.getElementById('auth-toggle-text').innerText = isLoginMode ? "Don't have an account? " : "Already have an account? ";
    document.getElementById('auth-toggle-link').innerText = isLoginMode ? "Sign up here" : "Sign in here";
}

// Admin Handlers
function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const pwd = document.getElementById('admin-pwd').value;
    const err = document.getElementById('admin-error');
    
    if(email === 'admin@gmail.com' && pwd === 'Admin@1234') {
        err.style.display = 'none';
        document.getElementById('admin-login-view').style.display = 'none';
        isLoggedIn = true;
        currentUserEmail = email;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserEmail', email);
        renderAdminDashboard();
    } else {
        err.style.display = 'block';
        err.innerText = 'Access Denied: Invalid administrator credentials.';
    }
}

function renderAdminDashboard() {
    const container = document.getElementById('admin-dashboard-container');
    container.style.display = 'block';
    
    // Static payload for admin
    const stats = [
        { label: 'Total Users', value: '14,204', change: '+12%' },
        { label: 'Portfolios Generated', value: '45,892', change: '+24%' },
        { label: 'AI Operations', value: '1.2M', change: '+5%' },
        { label: 'Server Status', value: 'Healthy', change: '99.9%' }
    ];
    const users = [
        { id: 1, name: 'Heyden Cel', email: 'heyden@example.com', plan: 'Enterprise', status: 'Active' },
        { id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', plan: 'Free', status: 'Active' },
        { id: 3, name: 'Elena Rodriguez', email: 'elena@example.com', plan: 'Pro', status: 'Offline' },
        { id: 4, name: 'David Smith', email: 'david@example.com', plan: 'Enterprise', status: 'Active' },
        { id: 5, name: 'Zoe Wong', email: 'zoe.w@example.com', plan: 'Free', status: 'Active' }
    ];

    container.innerHTML = `
      <nav class="glass-panel" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem 2rem; border-radius: 15px; border-left: 4px solid #ff0080;">
        <div style="display: flex; align-items: center; gap: 1rem;">
           <h2 style="font-size: 1.5rem; font-weight: bold;">AIFolio Admin Hub</h2>
           <span style="background: rgba(255,0,128,0.2); color: #ff0080; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; text-transform: uppercase;">Superuser</span>
        </div>
        <button class="btn-secondary" onclick="navigate('landing')" style="padding: 8px 20px; font-size: 0.9rem;">Exit Admin</button>
      </nav>

      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
          ${stats.map(stat => `
             <div class="glass-panel hover-lift" style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.2s;" onmouseenter="this.style.transform='translateY(-5px)'" onmouseleave="this.style.transform='translateY(0)'">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">${stat.label}</p>
                <div style="display: flex; align-items: baseline; gap: 1rem;">
                   <h3 style="font-size: 2.5rem; margin: 0; font-weight: 700;">${stat.value}</h3>
                   <span style="color: #27c93f; font-weight: bold; font-size: 0.9rem;">${stat.change}</span>
                </div>
             </div>
          `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
          <div class="glass-panel" style="padding: 2rem; border: 1px solid rgba(255,255,255,0.05); overflow-x: auto;">
             <div style="display: flex; justify-content: space-between; align-items: center; marginBottom: 2rem;">
                <h3 style="font-size: 1.5rem; margin: 0;">People Logged In</h3>
                <span class="badge" style="background: rgba(39, 201, 63, 0.1); color: #27c93f; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">LIVE</span>
             </div>
             
             <table style="width: 100%; min-width: 500px; border-collapse: collapse; text-align: left; margin-top: 1.5rem;">
                <thead>
                   <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); font-size: 0.9rem;">
                      <th style="padding: 1rem 0; font-weight: 500;">User</th>
                      <th style="padding: 1rem 0; font-weight: 500;">Email</th>
                      <th style="padding: 1rem 0; font-weight: 500;">Tier</th>
                      <th style="padding: 1rem 0; font-weight: 500;">Session</th>
                   </tr>
                </thead>
                <tbody>
                   ${users.map(user => `
                      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                         <td style="padding: 1.2rem 0; font-weight: 600;">${user.name}</td>
                         <td style="padding: 1.2rem 0; color: var(--text-secondary);">${user.email}</td>
                         <td style="padding: 1.2rem 0;">
                            <span style="background: ${user.plan === 'Enterprise' ? 'rgba(0, 255, 245, 0.15)' : 'rgba(139, 92, 246, 0.15)'}; color: ${user.plan === 'Enterprise' ? '#00fff5' : 'var(--accent-secondary)'}; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">${user.plan}</span>
                         </td>
                         <td style="padding: 1.2rem 0;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                               <div style="width: 8px; height: 8px; border-radius: 50%; background: ${user.status === 'Active' ? '#27c93f' : '#888'};"></div>
                               <span style="font-size: 0.9rem; color: var(--text-secondary);">${user.status}</span>
                            </div>
                         </td>
                      </tr>
                   `).join('')}
                </tbody>
             </table>
          </div>
           <div class="glass-panel" style="padding: 2rem; border: 1px solid rgba(255,255,255,0.05); overflow-x: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                 <h3 style="font-size: 1.5rem; margin: 0;">Recent Signups</h3>
                 <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">View All</button>
              </div>
              <table style="width: 100%; min-width: 500px; border-collapse: collapse; text-align: left;">
                 <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); font-size: 0.9rem;">
                       <th style="padding: 1rem 0; font-weight: 500;">User</th>
                       <th style="padding: 1rem 0; font-weight: 500;">Email</th>
                       <th style="padding: 1rem 0; font-weight: 500;">Plan</th>
                       <th style="padding: 1rem 0; font-weight: 500;">Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    ${users.map(u => `
                       <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <td style="padding: 1.2rem 0; font-weight: 600;">${u.name}</td>
                          <td style="padding: 1.2rem 0; color: var(--text-secondary);">${u.email}</td>
                          <td style="padding: 1.2rem 0;">
                             <span style="background: ${u.plan === 'Pro' ? 'rgba(139, 92, 246, 0.2)' : u.plan === 'Enterprise' ? 'rgba(0, 255, 245, 0.2)' : 'rgba(255,255,255,0.05)'}; color: ${u.plan === 'Pro' ? 'var(--accent-secondary)' : u.plan === 'Enterprise' ? '#00fff5' : '#ccc'}; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">${u.plan}</span>
                          </td>
                          <td style="padding: 1.2rem 0;">
                             <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${u.status === 'Active' ? '#27c93f' : '#888'};"></div>
                                <span style="font-size: 0.9rem; color: var(--text-secondary);">${u.status}</span>
                             </div>
                          </td>
                       </tr>
                    `).join('')}
                 </tbody>
              </table>
           </div>

           <div class="glass-panel" style="padding: 2rem; border: 1px solid rgba(255,255,255,0.05);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                 <h3 style="font-size: 1.5rem; margin: 0;">Live System Logs</h3>
                 <div style="display: flex; gap: 6px; align-items: center;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: #ff0080; animation: pulse 2s infinite;"></div>
                    <span style="font-size: 0.8rem; color: #ff0080; font-weight: bold;">LIVE</span>
                 </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1.2rem; font-family: monospace; font-size: 0.85rem;">
                 <div style="display: flex; gap: 1rem;"><span style="color: #888;">10:42:01</span><span style="color: #27c93f;">[INFO] Worker node 4 scaled up.</span></div>
                 <div style="display: flex; gap: 1rem;"><span style="color: #888;">10:41:15</span><span style="color: #00fff5;">[DB] Backup completed successfully.</span></div>
                 <div style="display: flex; gap: 1rem;"><span style="color: #888;">10:38:22</span><span style="color: #ffbd2e;">[WARN] API Rate limit near for User ID: 4192.</span></div>
                 <div style="display: flex; gap: 1rem;"><span style="color: #888;">10:35:09</span><span style="color: #27c93f;">[INFO] New deployment live on platform.</span></div>
                 <div style="display: flex; gap: 1rem;"><span style="color: #888;">10:30:00</span><span style="color: #ff0080;">[ERR] Failed webhook payment retry.</span></div>
              </div>
           </div>
        </div>
      </div>
    `;
}

// Wizard Handlers
function startWizard(configStr) {
    if(configStr) {
        const config = JSON.parse(decodeURIComponent(configStr));
        formData.aesthetic = config.aesthetic;
        formData.layout = config.layout;
        formData.colorPalette = config.colorPalette;
    } else {
        // Reset defaults
         formData.aesthetic = 'Dark & Modern';
         formData.layout = 'Bento Grid';
         formData.colorPalette = 'Deep Space (Dark)';
         formData.typography = 'System Default';
    }
    wizardStep = 1;
    document.getElementById('wizard-form-container').style.display = 'flex';
    document.getElementById('wizard-generating-container').style.display = 'none';
    document.getElementById('wizard-result-container').style.display = 'none';
    
    navigate('wizard');
    renderWizardStep();
}

function renderWizardStep() {
    const title = document.getElementById('wizard-step-title');
    const content = document.getElementById('wizard-step-content');
    const progress = document.getElementById('wizard-progress');
    const backBtn = document.getElementById('wizard-back-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    
    progress.style.width = ((wizardStep / 6) * 100) + '%';
    title.innerText = `Step ${wizardStep} of 6`;
    backBtn.style.display = wizardStep > 1 ? 'inline-flex' : 'none';
    nextBtn.innerText = wizardStep === 6 ? 'Generate ✨' : 'Continue';
    
    let html = '';
    if(wizardStep === 1) {
        html = `
        <div class="animate-fade">
          <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">What is your primary profession?</h3>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">This helps the AI structure your layout and copy.</p>
          <input type="text" class="neo-input" placeholder="e.g. Fullstack Developer, Product Designer..." value="${formData.role}" oninput="formData.role=this.value" autofocus>
          
          <h3 style="font-size: 1.4rem; margin-top: 2.5rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Profile Image (Optional)</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Upload a picture to personalize your site.</p>
          <div style="display: flex; align-items: center; gap: 1.5rem;">
             <input type="file" accept="image/*" class="neo-input" onchange="if(this.files[0]) formData.image = URL.createObjectURL(this.files[0]); renderWizardStep();" style="padding: 10px;">
             ${formData.image ? `<img src="${formData.image}" alt="Preview" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-primary);">` : ''}
          </div>
        </div>
        `;
    } else if (wizardStep === 2) {
        html = `
        <div class="animate-fade">
          <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">What are your core skills?</h3>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">List your top tools, languages, or frameworks.</p>
          <textarea class="neo-input" placeholder="e.g. React, Node.js, UI/UX, Figma (comma separated)" oninput="formData.skills=this.value" style="min-height: 140px; resize: none;" autofocus>${formData.skills}</textarea>
        </div>
        `;
    } else if (wizardStep === 3) {
        const styles = ['Minimalist Monospace', 'Dark & Modern', 'Vibrant Neo-Brutalism', 'Glass Edge', 'Soft Neumorphism'];
        const fonts = ['System Default', 'Space Grotesk', 'Playfair Display', 'Outfit', 'Courier New'];
        
        let styleHTML = styles.map(s => `
          <div onclick="formData.aesthetic='${s}'; renderWizardStep()" style="padding: 1.2rem 1.5rem; border-radius: 16px; border: 1px solid ${formData.aesthetic === s ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}; background: ${formData.aesthetic === s ? 'rgba(139, 92, 246, 0.08)' : 'transparent'}; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 1.2rem; margin-bottom: 0.8rem;">
            <div style="width: 22px; height: 22px; border-radius: 50%; border: 2px solid ${formData.aesthetic === s ? 'var(--accent-primary)' : '#444'}; background: ${formData.aesthetic === s ? 'var(--accent-primary)' : 'transparent'};"></div>
            <span style="font-size: 1.15rem; font-weight: 500;">${s}</span>
          </div>
        `).join('');

        let fontHTML = fonts.map(f => `
          <div onclick="formData.typography='${f}'; renderWizardStep()" style="padding: 1rem 1.5rem; border-radius: 12px; border: 1px solid ${formData.typography === f ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}; background: ${formData.typography === f ? 'rgba(139, 92, 246, 0.08)' : 'transparent'}; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 1rem; margin-bottom: 0.8rem;">
            <div style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid ${formData.typography === f ? 'var(--accent-primary)' : '#444'}; background: ${formData.typography === f ? 'var(--accent-primary)' : 'transparent'};"></div>
            <span style="font-size: 1.05rem; font-weight: 500;">${f}</span>
          </div>
        `).join('');

        html = `
        <div class="animate-fade" style="max-height: 50vh; overflow-y: auto; padding-right: 1rem;">
          <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Choose your aesthetic</h3>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">Select the visual framework for your generated site.</p>
          ${styleHTML}
          <h3 style="font-size: 1.4rem; margin-top: 2.5rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Typography</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Select your primary font family.</p>
          ${fontHTML}
        </div>
        `;
    } else if (wizardStep === 4) {
        const layouts = ['Bento Grid', 'Classic Hero & Sections', 'Fullscreen Interactive'];
        let layoutHTML = layouts.map(l => `
          <div onclick="formData.layout='${l}'; renderWizardStep()" style="padding: 1.2rem 1.5rem; border-radius: 16px; border: 1px solid ${formData.layout === l ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}; background: ${formData.layout === l ? 'rgba(139, 92, 246, 0.08)' : 'transparent'}; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1rem;">
            <div style="width: 22px; height: 22px; border-radius: 4px; border: 2px solid ${formData.layout === l ? 'var(--accent-primary)' : '#444'}; background: ${formData.layout === l ? 'var(--accent-primary)' : 'transparent'};"></div>
            <span style="font-size: 1.15rem; font-weight: 500;">${l}</span>
          </div>
        `).join('');

        html = `
        <div class="animate-fade">
          <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Preferred Layout Architecture</h3>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">How should the AI structure your information?</p>
          ${layoutHTML}
        </div>
        `;
    } else if (wizardStep === 5) {
        const palettes = ['Deep Space (Dark)', 'Cyberpunk Neon', 'Muted Earth', 'Ocean Breeze', 'Royal Amethyst', 'Sunset Glow', 'Forest Canopy'];
        let paletteHTML = palettes.map(p => `
          <div onclick="formData.colorPalette='${p}'; renderWizardStep()" style="padding: 1.2rem 1.5rem; border-radius: 16px; border: 1px solid ${formData.colorPalette === p ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}; background: ${formData.colorPalette === p ? 'rgba(139, 92, 246, 0.08)' : 'transparent'}; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 1rem;">
            <div style="width: 22px; height: 22px; border-radius: 50%; border: 2px solid ${formData.colorPalette === p ? 'var(--accent-primary)' : '#444'}; background: ${formData.colorPalette === p ? 'var(--accent-primary)' : 'transparent'}; flex-shrink: 0;"></div>
            <span style="font-size: 1rem; font-weight: 500; line-height: 1.2;">${p}</span>
          </div>
        `).join('');

        html = `
        <div class="animate-fade">
          <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Color Palette & Vibe</h3>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">Set the emotional tone of your portfolio.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            ${paletteHTML}
          </div>
        </div>
        `;
    } else if (wizardStep === 6) {
        html = `
        <div class="animate-fade">
          <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Bio & Socials</h3>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">Add a short intro and link your online profiles.</p>
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
             <div>
               <label style="display: block; margin-bottom: 0.6rem; font-size: 0.95rem; color: var(--text-secondary)">Short Bio / About You</label>
               <textarea class="neo-input" placeholder="e.g. I am a passionate developer who loves building things that scale." oninput="formData.bio=this.value" style="min-height: 100px; resize: vertical;">${formData.bio}</textarea>
             </div>
             <div>
               <label style="display: block; margin-bottom: 0.6rem; font-size: 0.95rem; color: var(--text-secondary)">GitHub Username</label>
               <input type="text" class="neo-input" placeholder="github.com/username..." value="${formData.socialGithub}" oninput="formData.socialGithub=this.value">
             </div>
             <div>
               <label style="display: block; margin-bottom: 0.6rem; font-size: 0.95rem; color: var(--text-secondary)">LinkedIn Profile</label>
               <input type="text" class="neo-input" placeholder="linkedin.com/in/username..." value="${formData.socialLinkedin}" oninput="formData.socialLinkedin=this.value">
             </div>
          </div>
        </div>
        `;
    }
    content.innerHTML = html;
}

function wizardBack() {
    if(wizardStep > 1) {
        wizardStep--;
        renderWizardStep();
    }
}

function wizardNext() {
    if(wizardStep < 6) {
        wizardStep++;
        renderWizardStep();
    } else {
        if (!isLoggedIn) {
            alert('Please sign in to generate your AI portfolio.');
            pendingGeneration = true;
            navigate('auth');
            return;
        }
        handleGenerate();
    }
}

function handleGenerate() {
    document.getElementById('wizard-form-container').style.display = 'none';
    document.getElementById('wizard-generating-container').style.display = 'flex';
    
    // Simulate generation delay
    setTimeout(() => {
        document.getElementById('wizard-generating-container').style.display = 'none';
        renderWizardResult();
    }, 4500);
}

function renderWizardResult() {
    const resultContainer = document.getElementById('wizard-result-container');
    resultContainer.style.display = 'block';
    
    // Dynamic styling
    let bgColor = 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)';
    let accentColor = '#fff';
    let secondaryAccent = 'var(--accent-primary)';
    
    if(formData.colorPalette === 'Cyberpunk Neon') { accentColor = '#00fff5'; secondaryAccent = '#ff0080'; bgColor = 'linear-gradient(135deg, #090014 0%, #1a0033 100%)'; }
    if(formData.colorPalette === 'Muted Earth') { accentColor = '#d4a373'; secondaryAccent = '#8b7355'; bgColor = 'linear-gradient(135deg, #1A1814 0%, #2a251c 100%)'; }
    if(formData.colorPalette === 'Ocean Breeze') { accentColor = '#00d4ff'; secondaryAccent = '#0088cc'; bgColor = 'linear-gradient(135deg, #00101f 0%, #00284d 100%)'; }
    if(formData.colorPalette === 'Royal Amethyst') { accentColor = '#e0aaff'; secondaryAccent = '#9d4edd'; bgColor = 'linear-gradient(135deg, #140026 0%, #2d004d 100%)'; }
    if(formData.colorPalette === 'Sunset Glow') { accentColor = '#ff7b00'; secondaryAccent = '#ff0055'; bgColor = 'linear-gradient(135deg, #2b0b00 0%, #591700 100%)'; }
    if(formData.colorPalette === 'Forest Canopy') { accentColor = '#00ff88'; secondaryAccent = '#00b359'; bgColor = 'linear-gradient(135deg, #051c11 0%, #0a3320 100%)'; }
    if(formData.aesthetic === 'Vibrant Neo-Brutalism') bgColor = secondaryAccent;

    // Mobile detection for dynamic styling
    const isMobile = window.innerWidth <= 768;
    const titleFontSize = isMobile ? '2.5rem' : '4rem';
    const subTitleFontSize = isMobile ? '3rem' : '5rem';
    const padding = isMobile ? '2rem 1rem' : '4rem 2rem';

    let aestheticClass = 'aesthetic-modern';
    if(formData.aesthetic === 'Minimalist Monospace') aestheticClass = 'aesthetic-minimalist';
    if(formData.aesthetic === 'Vibrant Neo-Brutalism') aestheticClass = 'aesthetic-brutalism';
    if(formData.aesthetic === 'Glass Edge') aestheticClass = 'aesthetic-glass';
    if(formData.aesthetic === 'Soft Neumorphism') aestheticClass = 'aesthetic-neumorphism';

    let fontFamily = 'system-ui, -apple-system, sans-serif';
    if (formData.typography === 'Space Grotesk') fontFamily = "'Space Grotesk', system-ui, sans-serif";
    if (formData.typography === 'Playfair Display') fontFamily = "'Playfair Display', serif";
    if (formData.typography === 'Outfit') fontFamily = "'Outfit', sans-serif";
    if (formData.typography === 'Courier New') fontFamily = "'Courier New', Courier, monospace";
    if (formData.typography === 'System Default') {
        if (formData.aesthetic === 'Minimalist Monospace') fontFamily = "'Courier New', Courier, monospace";
        if (formData.aesthetic === 'Vibrant Neo-Brutalism') fontFamily = "'Space Grotesk', system-ui, sans-serif";
    }

    const getLayoutHTML = () => {
        if (formData.layout === 'Bento Grid') {
            const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['Design', 'Code', 'Product'];
            
            return `
            <div class="bento-grid-container stagger-2">
              <div class="glass-card bento-item bento-hero" style="position: relative;">
                <div class="ambient-orb" style="position: absolute; top: -50px; right: -50px; width: 250px; height: 250px; background: ${accentColor}; filter: blur(100px); opacity: 0.1; border-radius: 50%;"></div>
                <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; height: 100%;">
                   ${formData.image ? `<img src="${formData.image}" alt="Profile" style="width: 120px; height: 120px; border-radius: ${formData.aesthetic === 'Minimalist Monospace' ? '0' : '32px'}; object-fit: cover; border: 2px solid rgba(255,255,255,0.08); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">` : ''}
                   <div style="flex: 1;">
                     <span style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700;">Engineered Profile</span>
                     <h1 class="h1-title" style="font-size: clamp(2.5rem, 5vw, 4.5rem); margin: 0.5rem 0; line-height: 1.0; font-weight: 900;">
                       I'm a <span>${formData.role || 'Pro'}</span>
                     </h1>
                     <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <span style="width: 40px; height: 2px; background: ${accentColor}; margin-top: 10px;"></span>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 1.1rem; max-width: 400px; line-height: 1.5;">Architecting digital excellence through ${formData.aesthetic.toLowerCase()} patterns.</p>
                     </div>
                   </div>
                </div>
              </div>

              <div class="glass-card bento-item bento-stats">
                  <span style="font-size: 0.75rem; color: var(--accent-secondary); font-weight: bold; text-transform: uppercase;">Engagement</span>
                  <div style="font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0;">1.2k+</div>
                  <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">Unique views this month across global networks.</p>
              </div>

              <div class="glass-card bento-item bento-skills">
                <h3 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.5px;">Core Expertise</h3>
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                   ${skillsArray.slice(0, 3).map(skill => `
                      <div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                          <span>${skill}</span>
                          <span style="color: var(--text-secondary);">95%</span>
                        </div>
                        <div class="skill-bar-container">
                          <div class="skill-bar-fill" style="transform: scaleX(0.${Math.floor(Math.random() * 3) + 7});"></div>
                        </div>
                      </div>
                   `).join('')}
                </div>
              </div>

              <div class="glass-card bento-item bento-tech">
                <h3 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.2rem; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                   <span style="width: 8px; height: 8px; border-radius: 50%; background: ${accentColor};"></span> Tech Stack Matrix
                </h3>
                <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                   ${skillsArray.map(skill => `<span class="tech-badge">${skill}</span>`).join('')}
                </div>
              </div>

              <div class="glass-card bento-item bento-bio" style="position: relative;">
                <div class="ambient-orb" style="position: absolute; bottom: -100px; left: -100px; width: 300px; height: 300px; background: ${secondaryAccent}; filter: blur(120px); opacity: 0.08; border-radius: 50%;"></div>
                <div style="position: relative; z-index: 1;">
                   <h3 style="color: #fff; margin: 0 0 1.2rem 0; font-size: 1.2rem; font-weight: 700;">Executive Biography</h3>
                   <p style="margin: 0; font-size: 1.2rem; line-height: 1.8; color: var(--text-secondary); max-width: 900px;">${formData.bio || 'Professional summary expertly crafted by AI based on your technical background and design preferences. Specializing in high-fidelity digital products.'}</p>
                   <div style="display: flex; gap: 1.5rem; margin-top: 2.5rem; flex-wrap: wrap;">
                     ${formData.socialGithub ? `<span class="premium-button" style="border-radius: 12px; padding: 12px 24px;">GitHub Profile ↗</span>` : ''}
                     ${formData.socialLinkedin ? `<span class="premium-button" style="border-radius: 12px; padding: 12px 24px;">LinkedIn Connect ↗</span>` : ''}
                     <span class="premium-button premium-button-primary" style="border-radius: 12px; padding: 12px 24px;">Download Resume</span>
                   </div>
                </div>
              </div>
            </div>`;
        } else if (formData.layout === 'Classic Hero & Sections') {
            return `
            <div class="stagger-2" style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 800px; margin: 0 auto; margin-bottom: 4rem; position: relative; padding: 0 1rem;">
              <div class="ambient-orb" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; background: ${accentColor}; filter: blur(120px); opacity: 0.08; border-radius: 50%; z-index: 0;"></div>
              <div style="position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;">
                ${formData.image ? `<img src="${formData.image}" alt="Profile" style="width: 140px; height: 140px; border-radius: ${formData.aesthetic === 'Minimalist Monospace' || formData.aesthetic === 'Vibrant Neo-Brutalism' ? '0' : '50%'}; object-fit: cover; margin-bottom: 2rem; border: 2px solid rgba(255,255,255,0.1); padding: 8px; background: rgba(255,255,255,0.03); box-shadow: ${formData.aesthetic === 'Vibrant Neo-Brutalism' ? '6px 6px 0 #000' : '0 20px 40px rgba(0,0,0,0.4)'};">` : ''}
                <h1 class="h1-title" style="font-size: ${subTitleFontSize}; margin: 0 0 1.5rem 0; line-height: 1.1;">
                   Hi, I'm a <br/><span style="${formData.aesthetic === 'modern' ? `background: linear-gradient(to right, #fff, ${accentColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` : ''}">${formData.role || 'Professional'}</span>
                </h1>
                <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 700px; margin: 0 0 2rem 0; line-height: 1.6; font-weight: 300;">
                  Specializing in <span style="color: ${formData.aesthetic === 'Vibrant Neo-Brutalism' ? '#fff' : accentColor};">${formData.skills || 'creating amazing digital experiences'}</span>.
                </p>
                <div class="glass-card" style="padding: 2rem; max-width: 600px; margin-bottom: 3rem;">
                  <p style="font-size: 1.1rem; margin: 0; line-height: 1.8; font-style: ${formData.aesthetic === 'Minimalist Monospace' ? 'normal' : 'italic'};">
                     "${formData.bio || 'AI generated bio goes here. Crafting elegant solutions and scalable architectures.'}"
                  </p>
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                    ${formData.socialGithub ? `<span class="premium-button">Explore GitHub ↗</span>` : ''}
                    ${formData.socialLinkedin ? `<span class="premium-button">Connect on LinkedIn ↗</span>` : ''}
                    ${(!formData.socialGithub && !formData.socialLinkedin) ? `<span class="premium-button premium-button-primary">View Resume ↗</span>` : ''}
                </div>
              </div>
            </div>`;
        } else {
            // Fullscreen Interactive
            return `
            <div class="stagger-2" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 100%; min-height: 100%; padding: 4rem; position: relative; text-align: left;">
              <div class="ambient-orb" style="position: absolute; top: 0; right: 0; width: 60%; height: 100%; background: ${accentColor}; filter: blur(120px); opacity: 0.15; z-index: 0;"></div>
              <div style="position: relative; z-index: 1; max-width: 1000px;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                   ${formData.image ? `<img src="${formData.image}" alt="Profile" style="width: 80px; height: 80px; border-radius: ${formData.aesthetic === 'Vibrant Neo-Brutalism' || formData.aesthetic === 'Minimalist Monospace' ? '0' : '50%'}; object-fit: cover; border: 2px solid ${accentColor};">` : ''}
                   <span style="font-size: 1.2rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 4px; font-weight: 600;">PORTFOLIO // 2026</span>
                </div>
                <h1 class="h1-title" style="font-size: clamp(4rem, 8vw, 8rem); margin: 0 0 2rem 0; line-height: 0.9; letter-spacing: -3px;">
                   ${formData.role ? formData.role.toUpperCase() : 'CREATIVE'} <br/>
                   <span style="color: transparent; -webkit-text-stroke: 2px ${formData.aesthetic === 'Vibrant Neo-Brutalism' ? '#fff' : accentColor}; text-shadow: none;">ENGINEER</span>
                </h1>
                <p style="font-size: 1.5rem; color: var(--text-secondary); max-width: 600px; margin: 0 0 4rem 0; line-height: 1.6;">
                  ${formData.bio || 'I build exceptional digital experiences that live at the intersection of design and technology.'}
                </p>
                <div style="display: flex; gap: 1rem;">
                  <span class="premium-button premium-button-primary" style="padding: 20px 40px; font-size: 1.1rem;">ENTER EXPERIENCE</span>
                </div>
              </div>
            </div>`;
        }
    };

    resultContainer.innerHTML = `
      <div class="wizard-container animate-fade ${aestheticClass}" style="min-height: 100vh; padding: 2rem; position: relative; overflow: hidden; font-family: ${fontFamily}; width: 100%;">
        <div class="ambient-orb" style="position: absolute; top: 10%; left: 20%; width: 400px; height: 400px; background: ${accentColor}; filter: blur(150px); opacity: 0.15; border-radius: 50%; z-index: 0; animation: floatOrb 10s ease-in-out infinite alternate;"></div>
        <div class="ambient-orb" style="position: absolute; bottom: 10%; right: 20%; width: 300px; height: 300px; background: ${secondaryAccent}; filter: blur(150px); opacity: 0.15; border-radius: 50%; z-index: 0; animation: floatOrb 8s ease-in-out infinite alternate-reverse;"></div>
        
        <nav class="glass-panel" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem 2rem; border-radius: 15px; position: relative; z-index: 10; border: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #00ff88; box-shadow: 0 0 10px #00ff88;"></div>
            <h2 style="font-size: 1.2rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Live Editor</h2>
          </div>
          
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <select onchange="formData.aesthetic=this.value; renderWizardResult()" style="padding: 8px 12px; border-radius: 8px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); outline: none; cursor: pointer; font-size: 0.9rem; backdrop-filter: blur(10px);">
              ${['Dark & Modern', 'Minimalist Monospace', 'Vibrant Neo-Brutalism', 'Glass Edge', 'Soft Neumorphism'].map(opt => `<option ${formData.aesthetic === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
            
            <select onchange="formData.typography=this.value; renderWizardResult()" style="padding: 8px 12px; border-radius: 8px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); outline: none; cursor: pointer; font-size: 0.9rem; backdrop-filter: blur(10px);">
              ${['System Default', 'Space Grotesk', 'Playfair Display', 'Outfit', 'Courier New'].map(opt => `<option ${formData.typography === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
            
            <select onchange="formData.layout=this.value; renderWizardResult()" style="padding: 8px 12px; border-radius: 8px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); outline: none; cursor: pointer; font-size: 0.9rem; backdrop-filter: blur(10px);">
              ${['Bento Grid', 'Classic Hero & Sections', 'Fullscreen Interactive'].map(opt => `<option ${formData.layout === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
            
            <select onchange="formData.colorPalette=this.value; renderWizardResult()" style="padding: 8px 12px; border-radius: 8px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); outline: none; cursor: pointer; font-size: 0.9rem; backdrop-filter: blur(10px);">
              ${['Deep Space (Dark)', 'Cyberpunk Neon', 'Muted Earth', 'Ocean Breeze', 'Royal Amethyst', 'Sunset Glow', 'Forest Canopy'].map(opt => `<option ${formData.colorPalette === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
            
            <div style="height: 24px; width: 1px; background: rgba(255,255,255,0.2); margin: 0 0.5rem;"></div>
            
            <button class="premium-button" onclick="document.getElementById('wizard-result-container').style.display='none'; document.getElementById('wizard-form-container').style.display='flex'; wizardStep=1; renderWizardStep();" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 30px;">Edit Content</button>
            <button class="premium-button premium-button-primary" onclick="navigate('dashboard')" style="padding: 8px 24px; font-size: 0.9rem; border-radius: 30px;">Save & Exit</button>
          </div>
        </nav>
        
        <div class="sleek-scroll presentation-bg" style="background: ${bgColor}; overflow-y: auto; height: 75vh; position: relative; z-index: 10; padding: ${formData.layout === 'Fullscreen Interactive' ? '0' : padding}; display: flex; flex-direction: column; align-items: center; justify-content: ${formData.layout === 'Fullscreen Interactive' ? 'center' : 'flex-start'};">
          <div class="stagger-1" style="display: ${formData.layout === 'Fullscreen Interactive' ? 'none' : 'inline-flex'}; align-items: center; gap: 8px; padding: 8px 20px; background: linear-gradient(90deg, ${secondaryAccent}20, ${accentColor}20); color: ${accentColor}; border-radius: 50px; margin-bottom: 2rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; font-size: 0.75rem; border: 1px solid ${accentColor}40; backdrop-filter: blur(10px);">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${accentColor};"></span>
            AI Generated • ${formData.aesthetic}
          </div>
          
          ${getLayoutHTML()}
          
          <div class="stagger-4" style="display: flex; gap: 1rem; margin-top: ${formData.layout === 'Fullscreen Interactive' ? '0' : 'auto'}; position: ${formData.layout === 'Fullscreen Interactive' ? 'absolute' : 'relative'}; bottom: ${formData.layout === 'Fullscreen Interactive' ? '2rem' : 'auto'}; right: ${formData.layout === 'Fullscreen Interactive' ? '2rem' : 'auto'}; padding-top: 2rem; z-index: 20; width: ${isMobile ? '100%' : 'auto'}; flex-direction: ${isMobile ? 'column' : 'row'};">
             <button class="premium-button" style="width: 100%" onclick="alert('Starting local source download...')"><span style="margin-right: 8px;">↓</span> Download Source</button>
             <button class="premium-button premium-button-primary" style="width: 100%" onclick="startDeployment()"><span style="margin-right: 8px;">▲</span> Deploy</button>
          </div>
        </div>
      </div>
    `;
}

function startDeployment() {
    const overlay = document.getElementById('deployment-overlay');
    overlay.style.display = 'flex';
    
    const steps = [
        { msg: 'Initializing edge functions...', delay: 800 },
        { msg: 'Optimizing high-fidelity assets...', delay: 1200 },
        { msg: 'Generating SSL certification...', delay: 1000 },
        { msg: 'Propagating global DNS records...', delay: 1500 }
    ];
    
    let currentStep = 0;
    
    const renderStatus = (msg) => {
        overlay.innerHTML = `
            <div class="glass-panel text-center animate-fade" style="padding: 4rem; max-width: 600px; width: 100%;">
                <div class="loader-ring" style="width: 80px; height: 80px; border: 4px solid rgba(255,255,255,0.1); border-top-color: var(--accent-primary); border-radius: 50%; animation: spin 1s infinite; margin: 0 auto 2rem auto;"></div>
                <h2 class="gradient-text" style="font-size: 2rem; margin-bottom: 1rem;">Architecting Cloud...</h2>
                <p style="color: var(--text-secondary); font-size: 1.1rem; font-family: monospace;">${msg}</p>
                <div style="margin-top: 2rem; background: rgba(255,255,255,0.05); height: 6px; border-radius: 10px; overflow: hidden;">
                    <div style="width: ${(currentStep / steps.length) * 100}%; height: 100%; background: var(--accent-primary); transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;
    };
    
    const processStep = () => {
        if (currentStep < steps.length) {
            renderStatus(steps[currentStep].msg);
            setTimeout(() => {
                currentStep++;
                processStep();
            }, steps[currentStep].delay);
        } else {
            renderDeploySuccess();
        }
    };
    
    processStep();
}

function renderDeploySuccess() {
    const overlay = document.getElementById('deployment-overlay');
    overlay.style.display = 'flex';
    const mockUrl = `https://aifolio.dev/${formData.role.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    overlay.innerHTML = `
        <div class="glass-panel text-center animate-fade" style="padding: 4rem; max-width: 700px; width: 100%; position: relative; overflow: hidden;">
            <div class="deploy-success-glow" style="width: 100px; height: 100px; background: #27c93f; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2.5rem auto; font-size: 3rem;">✓</div>
            <h1 class="gradient-text" style="font-size: 3rem; margin-bottom: 1rem;">You are Live!</h1>
            <p style="color: var(--text-secondary); font-size: 1.2rem; margin-bottom: 3rem;">Your professional presence has been engineered and deployed to the global edge network.</p>
            
            <div class="glass-panel" style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 15px; margin-bottom: 3rem; display: flex; align-items: center; justify-content: space-between;">
                <code style="color: var(--accent-secondary); font-size: 1.1rem;">${mockUrl}</code>
                <button class="btn-secondary" style="padding: 8px 16px; font-size: 0.8rem;" onclick="navigator.clipboard.writeText('${mockUrl}'); this.innerText='Copied!'">Copy</button>
            </div>
            
            <div style="display: flex; gap: 1.5rem; justify-content: center;">
                <button class="btn-primary" style="padding: 16px 40px;" onclick="window.open('${mockUrl}', '_blank')">View Live Site ↗</button>
                <button class="btn-secondary" style="padding: 16px 40px; background: rgba(255,255,255,0.05);" onclick="location.reload()">Back to Dashboard</button>
            </div>
        </div>
    `;
    
    // Simple confetti
    for(let i=0; i<50; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.animationDelay = Math.random() * 2 + 's';
        c.style.backgroundColor = i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        overlay.appendChild(c);
    }
}
