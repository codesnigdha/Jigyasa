import "./QuickActions.css";

function QuickActions() {
  const actions = [
    {
      id: 1,
      icon: "✦",
      title: "Explain a Topic",
      description: "Understand any concept in simple language",
      prompt: "Explain a topic to me in simple language.",
    },
    {
      id: 2,
      icon: "≡",
      title: "Summarize",
      description: "Get a short and clear summary",
      prompt: "Help me summarize a topic or text.",
    },
    {
      id: 3,
      icon: "?",
      title: "Generate Quiz",
      description: "Test your knowledge with questions",
      prompt: "Generate a quiz for me on a topic.",
    },
    {
      id: 4,
      icon: "◈",
      title: "Study Plan",
      description: "Create a personalized learning plan",
      prompt: "Create a study plan for me.",
    },
  ];

  const handleAction = (prompt) => {
    // Send the selected prompt to the AI chat
    window.dispatchEvent(
      new CustomEvent("jigyasa-ai-prompt", {
        detail: {
          prompt,
        },
      }),
    );
  };

  return (
    <div className="quick-actions">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          className="quick-action-card"
          onClick={() => handleAction(action.prompt)}
        >
          <div className="quick-action-icon">{action.icon}</div>

          <div className="quick-action-content">
            <h3>{action.title}</h3>

            <p>{action.description}</p>
          </div>

          <span className="quick-action-arrow">→</span>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;
