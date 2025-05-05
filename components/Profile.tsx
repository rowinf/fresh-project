
interface ProfileProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default (props: ProfileProps) => {
  return (
    <div id="preview" class="sample-transition">
      <div id="preview-content" class="rounded border border-gray-600 h-60 min-w-48 slide-it">
        <div class="slide-it">{props.firstName}</div>
        <div class="slide-it">{props.lastName}</div>
        <div class="slide-it">{props.email}</div>
      </div>
    </div>
  );
};
