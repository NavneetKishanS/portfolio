// Central loader for project data — both the Projects list and the
// ProjectDetail page import from here so there's one source of truth.
const context = require.context("./", false, /project\d+\.js$/);

const projects = context.keys().map((key) => {
  const mod = context(key);
  return mod.default || mod;
});

export default projects;
