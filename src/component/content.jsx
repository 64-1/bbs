import React, { Component } from "react";
import ListGroup from "./container/listGroup";
import Container from "./container/container";
import ShortcutBar from "./common/shortcutBar";

class Content extends Component {
  state = {};

  render() {
    const { theme, device, user, dateRevise, query } = this.props;
    return (
      <div className="container">
        <div className="row">
          {device === "computer" && <ListGroup theme={theme} />}
          <Container
            theme={theme}
            device={device}
            user={user}
            dateRevise={dateRevise}
            query={query}
          />
          {device === "computer" && <ShortcutBar theme={theme} />}
        </div>
      </div>
    );
  }
}

export default Content;
