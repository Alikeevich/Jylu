const link = { color: "inherit" };

export default function Index() {
  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "96px 16px" }}>
      <p>Jylu</p>
      <p>
        <a href="/kz/" style={link}>
          Қазақша
        </a>{" "}
        ·{" "}
        <a href="/ru/" style={link}>
          Русский
        </a>{" "}
        ·{" "}
        <a href="/en/" style={link}>
          English
        </a>
      </p>
    </main>
  );
}
