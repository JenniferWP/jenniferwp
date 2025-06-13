import { Tag } from "../tag";
import "./tags.css";

const Tags = ({ tags }: { tags: Array<string> }) => (
  <div className="containerTags">
    {tags.map((tag) => (
      <Tag value={tag} />
    ))}
  </div>
);

export { Tags };
