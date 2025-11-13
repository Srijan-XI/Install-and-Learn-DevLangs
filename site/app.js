(() => {
	// --- Config (optional override via window.repoConfig) ---
	const cfg = Object.assign({
		repoUrl: null,
		zipUrl: null,
	}, window.repoConfig || {});

	// --- Data model ---
	const languages = [
		{ type: 'language', name: 'C & C++', folder: ['C & C++'], install: ['C & C++','Installation-and-Usage-Guide.md'], questions: ['C & C++','questions of c & cpp'] },
		{ type: 'language', name: 'Golang', folder: ['Golang'], install: ['Golang','installation-guide-for-go.md'], questions: ['Golang','questions'] },
		{ type: 'language', name: 'JAVA', folder: ['JAVA'], install: ['JAVA','Installation-and-Usage-Guide.md'], questions: ['JAVA','Question'] },
		{ type: 'language', name: 'JavaScript', folder: ['JavaScript'], install: ['JavaScript','install&usage.md'], questions: ['JavaScript','questions'] },
		{ type: 'language', name: 'PHP', folder: ['PHP'], install: ['PHP','Installation-and-Use-Guide.md'], questions: ['PHP','Question'] },
		{ type: 'language', name: 'PYTHON', folder: ['PYTHON'], install: ['PYTHON','Installation-Guide.md'], questions: ['PYTHON','Python questions'] },
		{ type: 'language', name: 'R', folder: ['R'], install: ['R','Installation-and-Usage-Guide.md'], questions: ['R','R programming questions'] },
		{ type: 'language', name: 'RUST', folder: ['RUST'], install: ['RUST','Guide&Practice-Questions.md'], questions: ['RUST','Qustions'] },
		{ type: 'language', name: 'SQL', folder: ['SQL'], install: ['SQL','Introduction.md'], questions: ['SQL','questions'] },
		{ type: 'language', name: 'TypeScript', folder: ['TypeScript'], install: ['TypeScript','install&usage.md'], questions: ['TypeScript','questions'] },
	];

	const frameworks = [
		{ type: 'framework', name: 'Node.js', intro: ['JavaScript','NodeJs','intro.md'], folder: ['JavaScript','NodeJs'] },
		{ type: 'framework', name: 'Express.js', intro: ['JavaScript','ExpressJs','intro.md'], folder: ['JavaScript','ExpressJs'] },
		{ type: 'framework', name: 'Next.js', intro: ['JavaScript','NextJs','intro.md'], folder: ['JavaScript','NextJs'] },
	];

	const databases = [
		{ type: 'database', name: 'DynamoDB', folder: ['SQL','DynamoDB'] },
		{ type: 'database', name: 'MongoDB', folder: ['SQL','MongoDB'] },
		{ type: 'database', name: 'MySQL', folder: ['SQL','MySQL'] },
		{ type: 'database', name: 'PostgreSQL', folder: ['SQL','PostgreSQL'] },
		{ type: 'database', name: 'Redis', folder: ['SQL','Redis'] },
	];

	const tools = [
		{ type: 'tool', name: 'Docker', intro: ['Docker','intro.md'], folder: ['Docker'] },
	];

  const quickLinks = [
    { label: 'README', path: ['README.md'] },
    { label: 'Quickstart', path: ['QUICKSTART.md'] },
    { label: 'Documentation', path: ['DOCUMENTATION.md'] },
    { label: 'Community', url: 'pages/community.html' },
    { label: 'Resources', url: 'pages/Resources.html' },
    { label: 'FAQ', url: 'pages/FAQ.html' },
    { label: 'Changelog', url: 'pages/changelog.html' },
    { label: 'Security', url: 'pages/SecurityPolicy.html' },
    { label: 'License', url: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/blob/main/LICENSE' },
  ];	const allItems = [...languages, ...frameworks, ...databases, ...tools];

	// --- Utilities ---
	const byId = (id) => document.getElementById(id);
	const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
	const el = (tag, className, attrs={}) => {
		const e = document.createElement(tag);
		if (className) e.className = className;
		for (const [k,v] of Object.entries(attrs)) e.setAttribute(k,v);
		return e;
	};
	const encodePath = (parts) => parts.map(encodeURIComponent).join('/');
	const rel = (parts) => `../${encodePath(parts)}`;
	const nowFmt = () => new Date().toLocaleString();

	// --- Rendering ---
	function renderStats() {
		const s = byId('stats');
		s.innerHTML = '';
		const stats = [
			{ label: 'Languages', num: String(languages.length) },
			{ label: 'Frameworks', num: String(frameworks.length) },
			{ label: 'Databases', num: String(databases.length) },
			{ label: 'DevOps Tools', num: String(tools.length) },
		];
		for (const st of stats) {
			const card = el('div','stat');
			const num = el('div','num'); num.textContent = st.num;
			const lab = el('div','label'); lab.textContent = st.label;
			card.append(num, lab);
			s.append(card);
		}
	}

	function typeBadge(t) {
		const b = el('span','badge');
		b.textContent = t.charAt(0).toUpperCase() + t.slice(1);
		return b;
	}

	function cardFor(item) {
		const c = el('div','card');
		c.dataset.type = item.type;

		const title = el('div','title');
		title.textContent = item.name;
		const meta = el('div','meta');
		meta.append(typeBadge(item.type));

		const links = el('div','links');

		// Common: open folder
		if (item.folder) {
			const folderA = el('a', null, { href: rel(item.folder), target: '_blank', rel: 'noopener' });
			folderA.textContent = 'Open folder';
			links.append(folderA);
		}

		// Language-specific
		if (item.type === 'language') {
			if (item.install) {
				const installA = el('a', null, { href: rel(item.install), target: '_blank', rel: 'noopener' });
				installA.textContent = 'Install guide';
				links.append(installA);
			}
			if (item.questions) {
				const qA = el('a', null, { href: rel(item.questions), target: '_blank', rel: 'noopener' });
				qA.textContent = 'Questions';
				links.append(qA);
			}
		}

		// Frameworks / Tools: intro link
		if ((item.type === 'framework' || item.type === 'tool') && item.intro) {
			const iA = el('a', null, { href: rel(item.intro), target: '_blank', rel: 'noopener' });
			iA.textContent = 'Intro';
			links.append(iA);
		}

		// Databases: folder link already added

		c.append(title, meta, links);
		return c;
	}

	function renderCards(list = allItems) {
		const wrap = byId('cards');
		wrap.innerHTML = '';
		list.forEach(item => wrap.append(cardFor(item)));
	}

  function renderQuickLinks() {
    const wrap = byId('links');
    wrap.innerHTML = '';
    quickLinks.forEach(q => {
      const href = q.url || rel(q.path);
      const a = el('a', null, { href: href, target: '_blank', rel: 'noopener' });
      a.textContent = q.label;
      wrap.append(a);
    });
  }	// --- Interactions ---
	function setupSearchAndFilters() {
		const search = byId('search');
		const chips = $$('.chip');
		let filter = 'all';
		let query = '';

		const apply = () => {
			const q = query.trim().toLowerCase();
			const list = allItems.filter(it => {
				const matchesType = filter === 'all' ? true : it.type === filter;
				const matchesQuery = q ? it.name.toLowerCase().includes(q) : true;
				return matchesType && matchesQuery;
			});
			renderCards(list);
		};

		search.addEventListener('input', (e) => { query = e.target.value || ''; apply(); });
		chips.forEach(ch => ch.addEventListener('click', () => {
			chips.forEach(x => x.classList.remove('active'));
			ch.classList.add('active');
			filter = ch.dataset.filter || 'all';
			apply();
		}));
	}

	function setupTheme() {
		const btn = byId('btn-theme');
		const key = 'il-devlangs-theme';
		const set = (val) => {
			document.body.classList.toggle('light', val === 'light');
			localStorage.setItem(key, val);
		};
		const stored = localStorage.getItem(key);
		if (stored) set(stored); else set('dark');
		btn.addEventListener('click', () => {
			const cur = document.body.classList.contains('light') ? 'light' : 'dark';
			set(cur === 'light' ? 'dark' : 'light');
		});
	}

	function setupRepoLinks() {
		const aZip = byId('btn-download');
		const aRepo = byId('repo-link');
		const aIssues = byId('issues-link');
		const aDisclaimerRepo = byId('disclaimer-repo-link');
		const meta = byId('meta');

		if (cfg.zipUrl) aZip.href = cfg.zipUrl; else { aZip.href = '#'; aZip.setAttribute('aria-disabled','true'); aZip.classList.add('disabled'); }
		if (cfg.repoUrl) {
			aRepo.href = cfg.repoUrl;
			aIssues.href = `${cfg.repoUrl.replace(/\/$/,'')}/issues`;
			if (aDisclaimerRepo) aDisclaimerRepo.href = cfg.repoUrl;
		} else {
			aRepo.href = '#';
			aIssues.href = '#';
			if (aDisclaimerRepo) aDisclaimerRepo.href = '#';
		}
		meta.textContent = '';
	}

	// --- Init ---
	function init(){
		renderStats();
		renderCards();
		renderQuickLinks();
		setupSearchAndFilters();
		setupTheme();
		setupRepoLinks();
	}

	document.addEventListener('DOMContentLoaded', init);
})();

