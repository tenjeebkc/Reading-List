import { useEffect, useState, useCallback } from "react";
import "./App.css";

type ReadingItem = {
  id: number;
  title: string;
  author: string;
};

function App() {
  const [items, setItems] = useState<ReadingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const fetchReadingList = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const params = new URLSearchParams(window.location.search);
    const demoState = params.get("state");

    if (demoState === "loading") {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (demoState === "error") {
      setError(
        "We couldn't load your reading list. Please check your connection and try again.",
      );
      setIsLoading(false);
      return;
    }

    if (demoState === "empty") {
      setItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/readingList");

      if (!response.ok) {
        throw new Error("Failed to load reading list.");
      }

      const data: ReadingItem[] = await response.json();
      setItems(data);
    } catch {
      setError(
        "We couldn't load your reading list. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReadingList();
  }, [fetchReadingList]);

  const handleAddItem = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      return;
    }

    const newItem = {
      title: title.trim(),
      author: author.trim(),
    };

    try {
      const response = await fetch("http://localhost:3001/readingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item.");
      }

      const createdItem: ReadingItem = await response.json();

      setItems((currentItems) => [...currentItems, createdItem]);
      setTitle("");
      setAuthor("");
      setIsFormOpen(false);
    } catch {
      setError("We couldn't add this item. Please try again.");
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/readingList/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item.");
      }

      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    } catch {
      setError("We couldn't remove this item. Please try again.");
    }
  };

  return (
    <main className="reading-list-page">
      <section className="reading-list">
        <header className="reading-list-header">
          <p className="eyebrow">PERSONAL READING LIST</p>

          <h1>My Reading List</h1>

          <p className="intro">
            Keep track of books and articles you want to read.
          </p>

          <button type="button" onClick={() => setIsFormOpen(true)}>
            + Add item
          </button>
        </header>

        {isFormOpen && (
          <form className="add-form" onSubmit={handleAddItem}>
            <h2>Add a reading item</h2>

            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="author">Author</label>
            <input
              id="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />

            <div className="form-actions">
              <button type="submit">Add to reading list</button>

              <button type="button" onClick={() => setIsFormOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <section aria-labelledby="reading-list-heading">
          <h2 id="reading-list-heading">Saved items</h2>

          {isLoading && (
            <div className="state-loading" role="state">
              <h3>Loading your reading list</h3>
              <p>Please wait while we retrieve your saved items</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="state state-error" role="alert">
              <h3>Unable to load your reading list</h3>

              <p>{error}</p>

              <button type="button" onClick={fetchReadingList}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="state empty-state">
              <h3>Your reading list is empty</h3>
              <p>
                Add books or articles here so you can keep track of what you
                want to read.
              </p>

              <button type="button" onClick={() => setIsFormOpen(true)}>
                Add your first item
              </button>
            </div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <ul className="book-list">
              {items.map((item) => (
                <li className="book-item" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.author}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
