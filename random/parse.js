function parse() {
  return Object.entries(data).map(([k, v]) => {
    let parsed;
    try {
      parsed = JSON.parse(v);
    } catch (err) {
      parsed = v;
    } finally {
      return { [k]: parsed };
    }
  });
}
