import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "../../../src/redux/notesSlice";
import BtCreateNew from "../../components/BtCreateNew";
import Notes from "../notes/Notes";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);
  console.log(notes);
  const status = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "Unknown date";
    return dateFormatter.format(d);
  }

  return (
    <Notes>
      <div className="flex-1 flex flex-col px-4 pt-5 overflow-hidden relative">
        <div className="mb-3">
          <h1 className="font-bold text-2xl">All Notes</h1>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 scroll-hidden">
          {status === "loading" && <p>Loading notes...</p>}
          {status === "failed" && <p className="text-red-500">{error}</p>}
          {status === "succeeded" && notes.length === 0 && (
            <p className="bg-start-bg rounded-md p-2 border border-gray-200">
              You don’t have any notes yet. Start a new note to capture your
              thoughts and ideas.
            </p>
          )}
          {status === "succeeded" && notes.length > 0 && (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <Link
                    to={`/details/${note.id}`}
                    className="border-b-2 border-gray-200 py-4 pl-2 cursor-pointer w-full text-start flex items-center gap-2 hover:-translate-y-0.5 hover:bg-gray-50 rounded hover:shadow"
                  >
                    <div className="space-y-3">
                      <h2 className="font-semibold">{note.title}</h2>
                      <div className="flex gap-2 text-sm">
                        {(note.tags || []).map((tag) => (
                          <h3 key={tag} className="px-1 bg-gray-200 rounded-sm">
                            {tag}
                          </h3>
                        ))}
                      </div>
                      <p>{formatDate(note.last_edited)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <BtCreateNew />
      </div>
    </Notes>
  );
}

export default Home;
