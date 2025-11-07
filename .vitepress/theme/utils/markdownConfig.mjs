import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import markdownItAttrs from "markdown-it-attrs";
import container from "markdown-it-container";
import abbr_plugin from "markdown-it-abbr";
import deflist_plugin from "markdown-it-deflist";
import ins_plugin from "markdown-it-ins";
import footnote_plugin from "markdown-it-footnote";
import mark_plugin from "markdown-it-mark";
import sub_plugin from "markdown-it-sub";
import sup_plugin from "markdown-it-sup";
import temml from "markdown-it-math/temml";
import typst from '@lowmst/markdown-it-typst-math';

// markdown-it
const markdownConfig = (md, themeConfig) => {
  // Plugins
  let useTemml = true; // Set to true to use temml plugin instead of typst.
  if (useTemml) {
    md.use(temml);
  } else {
    md.use(typst, {
      typstInjection: "#show math.equation: set text(font: \"IBM Plex Math\", size: 1.1em)\n" // Set the font for math rendering.
    });
  }
  md.use(markdownItAttrs);
  md.use(tabsMarkdownPlugin);
  md.use(abbr_plugin);
  md.use(deflist_plugin);
  md.use(ins_plugin);
  md.use(footnote_plugin);
  // footnote
  md.renderer.rules.footnote_block_open = (tokens, idx, options) =>
    (options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') +
    '<FooterReferenceTitle />\n' +
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n';
  md.use(mark_plugin);
  md.use(sub_plugin);
  md.use(sup_plugin);
  // timeline
  md.use(container, "timeline", {
    validate: (params) => params.trim().match(/^timeline\s+(.*)$/),
    render: (tokens, idx) => {
      const m = tokens[idx].info.trim().match(/^timeline\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return `<div class="timeline">
                    <span class="timeline-title">${md.utils.escapeHtml(m[1])}</span>
                    <div class="timeline-content">`;
      } else {
        return "</div></div>\n";
      }
    },
  });
  // radio
  md.use(container, "radio", {
    render: (tokens, idx, _options, env) => {
      const token = tokens[idx];
      const check = token.info.trim().slice("radio".length).trim();
      if (token.nesting === 1) {
        const isChecked = md.renderInline(check, {
          references: env.references,
        });
        return `<div class="radio">
          <div class="radio-point ${isChecked}" />`;
      } else {
        return "</div>";
      }
    },
  });
  // button
  md.use(container, "button", {
    render: (tokens, idx, _options) => {
      const token = tokens[idx];
      const check = token.info.trim().slice("button".length).trim();
      if (token.nesting === 1) {
        return `<button class="button ${check}">`;
      } else {
        return "</button>";
      }
    },
  });
  // card
  md.use(container, "card", {
    render: (tokens, idx, _options) => {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="card">`;
      } else {
        return "</div>";
      }
    },
  });
  // quote
  md.use(container, "quote", {
    render(tokens, idx) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="quote-container"><span class="empty"></span><span class="content" type="text">`;
      } else {
        return `</span><span class="empty"></span></div>`;
      }
    },
  });
  // SwiperJS
  md.use(container, "swiper-slide", {
    render(tokens, idx) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="swiper-slide"><div>`;
      } else {
        return `</div></div>`;
      }
    },
  });
  md.use(container, "swiper-slide-no-shadow", {
    render(tokens, idx) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="swiper-slide no-shadow"><div>`;
      } else {
        return `</div></div>`;
      }
    },
  });
  md.use(container, "swiper", {
    render(tokens, idx) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="swiper"><div class="swiper-wrapper">`;
      } else {
        return `</div><div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>`;
      }
    },
  });
  // Table
  md.renderer.rules.table_open = () => {
    return '<div class="table-container"><table>';
  };
  md.renderer.rules.table_close = () => {
    return "</table></div>";
  };
  // Image
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrs[token.attrIndex("src")][1];
    const alt = token.content;
    if (!themeConfig.fancybox.enable) {
      return `<img src="${src}" alt="${alt}" loading="lazy">`;
    }
    return `<a class="img-fancybox" href="${src}" data-fancybox="gallery" data-caption="${alt}">
                <img class="post-img" src="${src}" alt="${alt}" loading="lazy" />
                <span class="post-img-tip">${alt}</span>
              </a>`;
  };
  
  // Obsidian Admonition
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const lang = token.info.trim();

    // Obsidian Admonition Handling
    if (lang.startsWith('ad-')) {
      // Get the content after `ad-` as type.
      const type = lang.substring(3);
      const content = token.content;

      const admonitionTypes = {
        'note': 'info',
        'question': 'info',
        'warning': 'warning',
        'tip': 'tip',
        'summary': 'info',
        'hint': 'tip',
        'important': 'warning',
        'caution': 'warning',
        'error': 'danger',
        'danger': 'danger'
      };

      const className = admonitionTypes[type] || 'info';
      const title = type.toUpperCase();

      return `<div class="${className} custom-block">
            <p class="custom-block-title">${title}</p>
            <div class="custom-block-content">
              ${md.render(content)}
            </div>
    </div>`;
    }
    return fence(...args);
  };  
};

export default markdownConfig;
