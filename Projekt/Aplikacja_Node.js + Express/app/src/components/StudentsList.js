import Card from "@leafygreen-ui/card";
import { css } from "@leafygreen-ui/emotion";

const cardStyle = css`
  margin: 1em;
`

export default function StudentsList(props) {
  return (
    <Card className={cardStyle}>
      ID: {props._id} <br/>
      Nazwisko: {props.nazwisko} <br/>
      Imie: {props.imie} <br/>
    </Card>
  )
}