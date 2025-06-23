---
aside: false
comment: false
---

<script setup>
import { watchEffect, ref } from 'vue'
import { useI18n } from '@/utils/i18n'

const { currentLang } = useI18n()
const showZh = ref(false)

watchEffect(() => {
  showZh.value = currentLang.value.startsWith('zh')
  document.title = showZh.value ? '演示页面 1' : 'Demo Page 1'
})
</script>

<div v-if="showZh">

# 演示页面 1

通过这种方法，你可以为你的 VitePress 站点创建一个专门的网页。支持 *Markdown* 和其他 [markdown-it](https://github.com/markdown-it/markdown-it) 特性。甚至支持多语言本地化。

**Bold Text**

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

$$
E = mc^2
$$

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
</div>

<div v-else>

# Demo Page 1
  
This is how you can create a dedicated webpage for your VitePress site. *Markdown*, and other [markdown-it](https://github.com/markdown-it/markdown-it) features are supported. It even supports multilingual localization.

**Bold Text**

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

$$
E = mc^2
$$

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
</div>
