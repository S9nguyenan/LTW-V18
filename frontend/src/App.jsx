import { useEffect, useState } from 'react';

function Header({ onNavigate }) {
  return (
    <header className="header">
      <div className="header-container">
        <button className="logo" type="button" onClick={() => onNavigate('/')}>
          Shop Hang Hoa
        </button>
        <div className="search-bar">
          <input id="search-input" type="text" placeholder="Tim kiem..." />
        </div>
        <div className="header-icons">
          <button className="icon-btn" type="button" onClick={() => onNavigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <Header onNavigate={onNavigate} />
      <main className="container"></main>
    </>
  );
}

function LoginPage({ onNavigate }) {
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username').trim();
    const password = formData.get('password').trim();

    if (username === 'admin' && password === '1234') {
      setFeedback('Dang nhap thanh cong! Dang chuyen ve trang chu...');
      setFeedbackType('success');
      window.setTimeout(() => onNavigate('/'), 700);
      return;
    }

    setFeedback('Ten dang nhap hoac mat khau khong dung.');
    setFeedbackType('error');
  }

  return (
    <>
      <header className="page-title">
        <h1>Dang nhap</h1>
        <p>Nhap thong tin de truy cap trang ban hang.</p>
      </header>

      <main className="login-page">
        <section className="login-box">
          <h2>Dang nhap tai khoan</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Ten dang nhap</label>
            <input id="username" name="username" type="text" required />

            <label htmlFor="password">Mat khau</label>
            <input id="password" name="password" type="password" required />

            <button type="submit">Dang nhap</button>
          </form>
          <div className={`message ${feedbackType}`}>{feedback}</div>
        </section>
      </main>
    </>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopState() {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigate(nextPath) {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  }

  if (path === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  return <HomePage onNavigate={navigate} />;
}
