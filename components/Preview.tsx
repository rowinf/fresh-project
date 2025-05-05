
interface PreviewProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default (props: PreviewProps) => {
  return (
    <div id="preview">
      <div class="rounded border border-gray-600 h-60 min-w-48">
        <div>{props.firstName}</div>
        <div>{props.lastName}</div>
        <div>{props.email}</div>
      </div>
    </div>
  );
};
