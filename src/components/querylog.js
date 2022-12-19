/* eslint-disable no-unused-vars */
import { signal } from "@preact/signals";
import * as icons from "./icons";
import { Pre } from "./common";

export const QueryLog = ({ log }) => {
  return (
    <>
      {log.map((l, index) => (
        <LogItem log={l} defaultOpen={index === 0} />
      ))}
    </>
  );
};

// eslint-disable-next-line no-unused-vars
function LogItem({ log, defaultOpen }) {
  if (!log.expanded) {
    log.expanded = signal(null);
  }
  const open =
    (log.expanded.value === null && defaultOpen) || log.expanded.value;
  function onClickHeader() {
    log.expanded.value = !open;
  }
  // FIXME: this might not be updated properly when the log item changes
  // and the response comes in...
  return (
    <div>
      <div
        class="bg-gray-200 p-1 pl-2 mb-2 -mr-3 rounded-l text-xs"
        onClick={onClickHeader}
      >
        {open ? (
          <icons.MinusCircle class="h-3 w-3 inline-block mr-2" />
        ) : (
          <icons.PlusCircle class="h-3 w-3 inline-block mr-2" />
        )}
        {log.fromCache ? "cached " : null}
        {log && log.time ? (log.time / 1000).toFixed(1) + "s" : null}
      </div>
      {open ? (
        <Pre class="text-xs">
          {log.prompt}
          {log.response ? (
            <span class="text-red-800">{log.response}</span>
          ) : (
            <span class="text-red-300">...</span>
          )}
        </Pre>
      ) : null}
    </div>
  );
}