export default function Header(props) {
  return (
    <div className="h-full justify-between	flex flex-row bg-white border border-slate-300">
      <div className="ml-3 py-2">
        <span className="text-xl font-normal text-sky-700">DiverList</span>
      </div>
      {props.rightChildren ? props.rightChildren : null}
    </div>
  );
}
