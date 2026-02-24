import "./exp-5.css";

function Dashboard() {
  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>

        <h2>Skills</h2>
        <ol className="list">
          <li>Cpp</li>
          <li>React</li>
          <li>SQL</li>
          <li>Mongo DB</li>
        </ol>

        <h2>About Me</h2>
        <p>
          I am a full-stack developer interested in building scalable web applications.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;