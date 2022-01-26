const path = {
  join(...elems) {
    const res = elems.reduce((agg, cur) => {
      const lastIndex = agg.length - 1;

      if (lastIndex === -1) return cur;
      else if (agg[lastIndex] == "/" && cur[0] != "/") return (agg += cur);
      else if (agg[lastIndex] == "/" && cur[0] == "/")
        return (agg += cur.slice(1));
      else if (agg[lastIndex] != "/" && cur[0] != "/")
        return (agg += "/" + cur);
      else if (agg[lastIndex] != "/" && cur[0] == "/") return (agg += cur);

      return agg;
    }, "");

    return res;
  },

  extname(path) {
    const lastPart = path.slice(path.lastIndexOf("/") + 1);

    if (lastPart[0] == "." || !lastPart.includes(".")) return "";
    else return lastPart.slice(lastPart.indexOf("."));
  },

  basename(path) {
    return path.slice(path.lastIndexOf("/") + 1);
  },

  dirname(path) {
    return path.slice(0, path.lastIndexOf("/"));
  },

  parse(path) {
    const dir = this.dirname(path);
    const base = this.basename(path);
    const root = dir.slice(0, dir.indexOf("/") + 1);
    let name;
    let ext;

    if (base[0] == ".") {
      name = base;
      ext = "";
    } else {
      const parts = base.split(".");
      name = parts[0];
      ext = "." + parts[1];
    }
    return { root, dir, base, name, ext };
  },

  relative(from, to) {
    const res = [];
    const fromParts = from.split("/");
    const toParts = to.split("/");
    let first = true;
    let part = "";

    for (let i = 0; i < fromParts.length; i++) {
      if (fromParts[i] === toParts[i]) {
        fromParts.shift();
        toParts.shift();
        i--;
      } else {
        if (first) {
          part = toParts.join("/");
          first = false;
        }
        res.push("..");
      }
    }
    res.push(part);

    return res.join("/");
  },

  delimiter(path) {
    return path.split(":");
  },

  sep(path) {
    return path.split("/");
  },
};

// console.log(path.join("aaa", "bbb", "ccc"));
// console.log(path.extname("/path/to/github.com/README"));
// console.log(path.extname("/path/to/.gitignore"));
// console.log(path.extname("/path/to/test.txt"));
// console.log(path.basename("/path/to/test.txt"));
// console.log(path.dirname("/path/to/test.txt"));
// console.log(path.parse("/path/to/test.txt"));
// console.log(path.relative("/app/views/home.html", "/app/layout/index.html"));
