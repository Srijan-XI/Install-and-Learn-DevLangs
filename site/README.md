# Static Site — Repository Info

A lightweight, modern web interface to explore the **DevSphere** repository without visiting GitHub.

## Features

- 🎨 **Dark/Light theme** with smooth toggle
- 🔍 **Search & filter** by language, framework, database, or tool
- 📊 **Live stats** (languages, frameworks, databases, DevOps tools)
- 🔗 **Direct links** to install guides, questions, intros, and docs
- 📱 **Fully responsive** (desktop, tablet, mobile)

## How to Run Locally

### Option 1: Python HTTP Server
```powershell
cd "p:\Install and Learn DevLangs\site"
python -m http.server 5500
```
Open: `http://localhost:5500`

### Option 2: Node.js `serve`
```powershell
cd "p:\Install and Learn DevLangs\site"
npx serve -l 5500
```
Open: `http://localhost:5500`

### Option 3: Open Directly
Simply double-click `index.html` to open in your browser. Some relative links may require a server.

## Optional: Configure GitHub Links

To enable the "Download ZIP", "GitHub Repo", and "Issues" links, add this snippet in `index.html` **before** `<script src="app.js"></script>`:

```html
<script>
  window.repoConfig = {
    repoUrl: "https://github.com/Srijan-XI/Install-and-Learn-DevLangs",
    zipUrl: "https://github.com/Srijan-XI/Install-and-Learn-DevLangs/archive/refs/heads/main.zip"
  };
</script>
```

## Structure

- `index.html` — Main page structure
- `main.css` — Styling (dark/light theme, responsive grid)
- `app.js` — Rendering, search/filter, theme toggle, relative path handling

## Technologies

- Vanilla HTML/CSS/JavaScript
- CSS Grid & Flexbox
- Inter font (Google Fonts)
- LocalStorage for theme persistence

---

**Enjoy exploring the repository!** 🚀
