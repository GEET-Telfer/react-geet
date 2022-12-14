import { Col, Row } from "react-bootstrap";

const placeholder = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate mi sit amet. In fermentum posuere urna nec tincidunt praesent semper. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Venenatis cras sed felis eget velit. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Pellentesque habitant morbi tristique senectus et netus. Tincidunt id aliquet risus feugiat in ante. Leo duis ut diam quam nulla porttitor. Bibendum neque egestas congue quisque. Ut pharetra sit amet aliquam id diam maecenas ultricies mi. Id semper risus in hendrerit gravida rutrum quisque non tellus. Tortor consequat id porta nibh venenatis cras sed. Amet consectetur adipiscing elit duis. Viverra maecenas accumsan lacus vel facilisis. Congue nisi vitae suscipit tellus mauris a diam maecenas sed.

Scelerisque fermentum dui faucibus in ornare quam viverra. Donec adipiscing tristique risus nec feugiat in fermentum. Odio tempor orci dapibus ultrices in iaculis nunc. Est velit egestas dui id ornare arcu. Pharetra diam sit amet nisl. Sit amet consectetur adipiscing elit pellentesque habitant. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Egestas diam in arcu cursus. Fusce id velit ut tortor pretium viverra suspendisse potenti. A iaculis at erat pellentesque. Id donec ultrices tincidunt arcu non. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor id. Quis risus sed vulputate odio. Integer feugiat scelerisque varius morbi enim nunc faucibus. Ac ut consequat semper viverra nam libero justo laoreet. Tempus iaculis urna id volutpat lacus.

Nulla at volutpat diam ut venenatis tellus in metus vulputate. Laoreet suspendisse interdum consectetur libero id. Tellus molestie nunc non blandit massa. Rutrum quisque non tellus orci ac auctor augue mauris augue. Placerat in egestas erat imperdiet. Fringilla urna porttitor rhoncus dolor. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Congue nisi vitae suscipit tellus mauris a diam maecenas. Velit egestas dui id ornare arcu odio ut. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Nunc sed augue lacus viverra vitae congue eu. Amet aliquam id diam maecenas ultricies. Amet dictum sit amet justo donec enim. Amet luctus venenatis lectus magna fringilla urna porttitor. Sit amet risus nullam eget felis eget nunc lobortis mattis. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Urna duis convallis convallis tellus id interdum velit.

Consectetur adipiscing elit ut aliquam purus sit amet luctus. Lorem dolor sed viverra ipsum nunc. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Fermentum posuere urna nec tincidunt praesent. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Sed turpis tincidunt id aliquet risus feugiat. Tellus molestie nunc non blandit. Libero nunc consequat interdum varius sit. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Ornare lectus sit amet est placerat in egestas erat. Urna neque viverra justo nec ultrices dui sapien eget.

Accumsan sit amet nulla facilisi morbi tempus. Condimentum lacinia quis vel eros donec ac odio tempor. Laoreet non curabitur gravida arcu ac tortor. Tincidunt id aliquet risus feugiat in ante metus dictum. Condimentum lacinia quis vel eros. Risus in hendrerit gravida rutrum quisque. Morbi tristique senectus et netus et malesuada fames ac. Magna eget est lorem ipsum dolor sit amet. In fermentum et sollicitudin ac orci phasellus. At in tellus integer feugiat scelerisque varius morbi. Nunc consequat interdum varius sit amet mattis. Justo donec enim diam vulputate. Vel turpis nunc eget lorem dolor. Orci phasellus egestas tellus rutrum. Ut aliquam purus sit amet luctus.
`;

/**
 * Micro-learning content section
 */
export default function Article(props) {
  const { content } = props;

  const content_ = content ? content : placeholder;

  return (
    <Row className="m-2">
      <Col md={{offset : 2, span : 8}}>
        <p dangerouslySetInnerHTML={{ __html: content_ }}></p>
      </Col>
    </Row>
  );
}
