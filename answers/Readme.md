## Pregunta 1

    Cuéntanos qué piezas de software crees que sea necesario desarrollar para el prototipo funcional y cómo se relacionan estas. Llamamos pieza de software a cada aplicación (web, móvil o de escritorio), cada API, cada proceso batch que se puede desplegar de forma independiente. Apóyate con un diagrama si crees necesario.

Una aplicación móvil es ideal por el caso de negocio, pero una aplicación web evita tener que lidiar con Google Play / App Store. Las siguientes piezas sirven como buena base para poder escalar el proyecto:

- API:

  - Recibe los pedidos
  - Devuelve los pedidos asignados a cada repartidor
  - Devuelve estado y ubicación de los pedidos
  - Envía correos de actualización según avance el estado de los pedidos

- Algoritmo:

  - Determine la ruta ideal dadas dos o más direcciones, buscando equilibrio entre pedidos entregados, recogidos y tiempo entre recojo-entrega.
  - En pieza aparte para optimizar velocidad.

- App web clientes:

  - Muestra al cliente el estado de sus pedidos
  - Permite rastrear los pedidos
  - En pieza aparte para escalar verticalmente de predecir mucho tráfico.

- App web trabajadores:
  - Administrar data de pedidos
  - Ver pedidos asignados a cada repartidor
  - Cambiar estados de pedidos

## Pregunta 2

    Cuéntanos sobre el tipo de arquitectura que elegiste para la pregunta (1). ¿Monolítica? ¿Micro-servicios? ¿Algún intermedio? ¿Otra? Comenta en qué te basaste para tomar esta decisión

Al ser un prototipo funcional, tener microservicios puede ocasionar un mayor gasto. Sin embargo, desacoplar el algoritmo da ventajas en desarrollo, despliegue y potencial escalabilidad.

Por otro lado, la propuesta de frontend está más alineada con el posible tráfico que pueda tener la aplicación de clientes, y permite responder rápidamente si una instancia ha llegado a su límite. Si el presupuesto es limitante, se pueden desplegar como subdominios en una misma instancia para evitar tener que pagar de más.

## Pregunta 3

> Describe la metodología de trabajo que usarías para el desarrollo. Puede ser alguna metodología conocida (Scrum, XP, RUP), una adaptación, o una mezcla entre varias metodologías. Lo que sea que tu experiencia te haya mostrado que funciona. Cuéntanos por qué crees que esta forma es adecuada para nuestro problema.

Lo potente de utilizar Scrum como un marco de trabajo es que se adapta a las necesidades cambiantes que son características en nuevos proyectos sin un costo, alcance y tiempo definidos por completo y con potencial para crecer. Algunas ventajas son:

- Potenciar al Impact Lead mediante el rol de Product Owner, plasmando sus ideas en tickets de implementación y spikes de investigación.
- Crea una cultura de entrega continua de valor.
- Mediante sus ceremonias (diarias, refinamiento y retrospectiva) busca el refinamiento constante del producto, previniendo errores y brindando ayuda cuando se presentan complicaciones.
- Permite a los miembros del equipo aportar ideas de mejora, y darle rumbo al proyecto.

## Pregunta 4

    Describe el workflow que usarías para colaborar usando Git. Al igual que con (3), puedes usar algo conocido o una adaptación.

Acostumbro a mantener 3 ramas principales, una para producción (`master`/`main`), una para pruebas con stakeholders (`staging`) y una de avances de desarrollo (`develop`).

A partir de esto, y siguiendo Scrum, los issues que se presentan por medio de tickets se abarcan cada uno en una branch (por ejemplo: `feat/<ticket-number>/<new-feature-name>`), y luego de revisarse por otro desarrollador, se combinan a `develop` y luego a `staging`.

A determinar por el equipo en qué momento del sprint (inicio, mediados o al final) se debe de hacer un pase a producción donde se pasa a la rama `master` las funcionalidades presentes en `staging` y aprobadas por el Product Owner.

## Pregunta 5

    ¿Crees que sea necesario agregar algún integrante extra al equipo durante el desarrollo del prototipo? ¿Cuál sería su rol? ¿Crees que sería necesario agregar nuevos integrantes después de la fase de prototipo? ¿Cuándo y por qué?

Un rol necesario según la arquitectura planteada es una persona dedicada a desarrollar y optimizar el algoritmo de planeamiento de rutas. Además, un tester para verificar el funcionamiento de la aplicación en distintas plataformas y que no se suban cambios que rompan algún funcionamiento. Quizá no tan acuciante, pero puede sumar mucho la presencia de un DevOps para configurar la integración y entrega continua.

Luego de pasar la fase de prototipo me parece importante agregar a una persona encargada de Analytics, para evaluar el crecimiento de la plataforma y poder medir KPIs para que se planifiquen mejoras. También se puede evaluar agregar más ingenieros de software según vayan aumentando las necesidades. Finalmente, tener a una persona encargada de diseño desacoplándolo del frontend para que se pueda dedicar a crear la identidad gráfica del producto.

## Pregunta 6

    ¿Qué otras consideraciones tendrías para hacer el proceso de desarrollo robusto y eficiente?

- Es importante el respeto y la comunicación entre el equipo, por lo que si no hay confianza al inicio del proyecto es recomendable que se invierta tiempo en generar un ambiente así.
- Buscar feedback de usuarios constantemente, para saber qué seguir haciendo y en qué se puede mejorar.
- Las pruebas evitan estar buscando qué commit rompió la plataforma, sirve mucho tenerlas al día.
- Modular correctamente y mantener el código ordenado y entendible.
- No hacer pases a producción al final de una semana, porque si pasa algún error es posible que no se pueda solucionar hasta el inicio de la siguiente.
