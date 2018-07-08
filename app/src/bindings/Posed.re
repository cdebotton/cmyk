type poser = unit => ReasonReact.reactClass;

type pose = {li: poser};

[@bs.module "react-pose"] external posed : pose = "default";

module type PoseConfig = {type poses('a);};

/* posed.li({
     "open": [X("0%"), StaggerChildren(100)],
     "closed": [X("-100%")],
   }); */