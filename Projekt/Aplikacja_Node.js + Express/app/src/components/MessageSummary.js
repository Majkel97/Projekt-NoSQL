import Card from "@leafygreen-ui/card";
import { css } from "@leafygreen-ui/emotion";
import { Link } from "react-router-dom";

const cardStyle = css`
  margin: 1em;
`

export default function MessageSummary(props) {
  return (
    <Card className={cardStyle}>
      Wysłane przez {props.student} <br/>
      do {props.odbiorca} <br/>
      on {(new Date(props.date)).toLocaleDateString()}<br/>
      <Link to={`/post/${props._id}`}>Zobacz wiadomość</Link><br/>
    </Card>
  )
}