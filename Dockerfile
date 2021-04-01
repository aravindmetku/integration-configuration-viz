FROM node:12

COPY index.js dist/index.js
COPY index.js /other-dist/index.js

