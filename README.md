# SUSHITAP 🍣

<p align="left">
  <a href="https://expo.dev"><img alt="Expo" src="https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white"></a>
  <a href="https://reactnative.dev"><img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black"></a>
  <a href="https://www.typescriptlang.org"><img alt="TypeScript" src="https://img.shields.io/github/languages/top/raamonsiu/SUSHITAP?logo=typescript&logoColor=white&color=3178C6"></a>
  <img alt="Android" src="https://img.shields.io/badge/Android-only-3DDC84?logo=android&logoColor=white">
  <a href="https://github.com/raamonsiu/SUSHITAP"><img alt="Version" src="https://img.shields.io/github/package-json/v/raamonsiu/SUSHITAP?color=F0805A"></a>
  <a href="https://github.com/raamonsiu/SUSHITAP/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/raamonsiu/SUSHITAP?color=B79A8C"></a>
  <a href="https://github.com/raamonsiu/SUSHITAP/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/raamonsiu/SUSHITAP?style=social"></a>
</p>

SUSHITAP es una app pequeña y sencilla para llevar la cuenta de las piezas de sushi que te comes en cada sesión. La pantalla principal muestra un contador grande y un nigiri animado: cada vez que tocas el sushi, el contador suma una pieza más, con una vibración suave y un pequeño "+1" que flota hacia arriba como confirmación. Si te has pasado contando, deslizar el dedo hacia abajo sobre el sushi resta una pieza.

En la esquina superior izquierda hay un botón que abre el menú de ajustes. Desde ahí se elige el idioma (español, inglés, catalán, francés, italiano, alemán o japonés, con la opción de seguir automáticamente el del sistema), el tema claro u oscuro (también con modo automático según el ajuste del teléfono) y el tipo de pieza de sushi (salmón, atún o tamago). Cambiar la pieza no es solo estético: cada sabor tiene su propia paleta de color, con variante clara y oscura, así que el fondo, los acentos y el propio dibujo del sushi cambian según la elección. El mismo menú incluye una sección de sugerencias que abre tu app de correo con el mensaje ya preparado, y los enlaces del desarrollador.

En la esquina superior derecha hay un botón que abre el historial. Ahí se ve la sesión actual en curso, con un botón para finalizarla (que la guarda en el historial y pone el contador a cero) y otro para empezar una sesión nueva. Debajo aparece la lista de sesiones anteriores, con la fecha y el total de piezas de cada una; cualquier sesión guardada se puede eliminar deslizándola hacia la izquierda. Ambos menús se abren deslizándose desde su lado correspondiente y se pueden cerrar tocando fuera, con el botón de cerrar, con el botón atrás del teléfono o arrastrándolos hacia el borde.

Todo lo que eliges (idioma, tema, sabor, sesión en curso e historial) se guarda en el propio dispositivo, así que se mantiene igual aunque cierres la app o reinicies el teléfono.

SUSHITAP no necesita conexión a internet ni cuenta de ningún tipo: no hay registro, ni inicio de sesión, ni servidor detrás. Todo el almacenamiento es local, en el propio teléfono (mediante AsyncStorage), así que los datos no salen del dispositivo ni se sincronizan con ningún sitio. Si desinstalas la app o borras sus datos, el historial y las preferencias se pierden, ya que no hay copia en ningún otro lugar.

## Star History

<a href="https://www.star-history.com/#raamonsiu/SUSHITAP&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=raamonsiu/SUSHITAP&type=Date&theme=dark">
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=raamonsiu/SUSHITAP&type=Date">
    <img alt="Gráfico de evolución de estrellas del repositorio" src="https://api.star-history.com/svg?repos=raamonsiu/SUSHITAP&type=Date">
  </picture>
</a>
