import React from "react";
import { LikeSVG, TalkSVG, ShareSVG, HeartSVG } from "../common/SVG";

const SvgGroup = ({
  theme,
  device,
  a,
  user,
  onLike,
  onTalk,
  onShareBoxOpen,
}) => {
  return (
    <div
      className="d-flex justify-content-between mt-3 row"
      style={{ width: "100%" }}
    >
      <HeartSVG like={a.like} theme={theme} />
      {user && (
        <div
          className="d-flex justify-content-between ml-auto"
          style={{ width: "20%" }}
        >
          <LikeSVG
            a={a}
            user={user || {}}
            device={device}
            onLike={() => onLike(a)}
          />
          <TalkSVG a={a} onTalk={onTalk} device={device} />
          <ShareSVG a={a} device={device} onShare={() => onShareBoxOpen(a)} />
        </div>
      )}
    </div>
  );
};

export default SvgGroup;
