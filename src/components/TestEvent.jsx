import addEvent from "./AddEvent";

export default function TestEvent() {
  return (
    <div className="flex min-h-screen min-w-full place-items-center justify-center">
      <button className="p-2 px-4 bg-blue-700 text-white text-2xl" onClick={addEvent}>
        Add Event
      </button>
    </div>
  );
}
