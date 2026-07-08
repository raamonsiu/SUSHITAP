# SUSHITAP

SUSHITAP es una app pequeña y sencilla para llevar la cuenta de las piezas de sushi que te comes en cada sesión. La pantalla principal muestra un contador grande y un nigiri animado: cada vez que tocas el sushi, el contador suma una pieza más, con un pequeño "+1" que flota hacia arriba como confirmación.

En la esquina superior izquierda hay un botón que abre el menú de ajustes, donde puedes elegir el idioma (español o inglés) y el tipo de pieza de sushi (salmón, atún o tamago). Cambiar la pieza no es solo estético: cada sabor tiene su propio tema de color, así que el fondo, los acentos y el propio dibujo del sushi cambian de tono según la elección.

En la esquina superior derecha hay un botón que abre el historial. Ahí se ve la sesión actual en curso, con un botón para finalizarla (que la guarda en el historial y pone el contador a cero) y otro para empezar una sesión nueva. Debajo aparece la lista de sesiones anteriores, con la fecha y el total de piezas de cada una. Ambos menús se abren deslizándose desde su lado correspondiente y se pueden cerrar tocando fuera, con el botón de cerrar, o arrastrándolos hacia el borde.

Todo lo que eliges (idioma, sabor, sesión en curso e historial) se guarda en el propio dispositivo, así que se mantiene igual aunque cierres la app o reinicies el teléfono.

SUSHITAP no necesita conexión a internet ni cuenta de ningún tipo: no hay registro, ni inicio de sesión, ni servidor detrás. Todo el almacenamiento es local, en el propio teléfono (mediante AsyncStorage), así que los datos no salen del dispositivo ni se sincronizan con ningún sitio. Si desinstalas la app o borras sus datos, el historial y las preferencias se pierden, ya que no hay copia en ningún otro lugar.
