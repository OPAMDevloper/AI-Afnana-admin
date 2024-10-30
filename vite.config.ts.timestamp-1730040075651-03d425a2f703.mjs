// vite.config.ts
import path from "path";
import checker from "file:///C:/Users/asus/Desktop/e%20commerce/Admin-Panel-Material-UI-Design/node_modules/vite-plugin-checker/dist/esm/main.js";
import { defineConfig } from "file:///C:/Users/asus/Desktop/e%20commerce/Admin-Panel-Material-UI-Design/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/asus/Desktop/e%20commerce/Admin-Panel-Material-UI-Design/node_modules/@vitejs/plugin-react-swc/index.mjs";
console.log("VITE_APP_PORT:", process.env.VITE_APP_PORT);
console.log("VITE_APP_HOST:", process.env.VITE_APP_HOST);
console.log("app url  , ", JSON.stringify(process.env.VITE_APP_BASE_URL));
var vite_config_default = defineConfig({
  define: {
    "import.meta.env.BASE_URL": JSON.stringify(process.env.VITE_APP_BASE_URL)
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      overlay: {
        position: "tl",
        initialIsOpen: false
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1")
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1")
      }
    ]
  },
  // server: { port: Number(JSON.stringify(process.env.VITE_APP_PORT)), host: JSON.stringify(process.env.VITE_APP_HOST) },
  // preview: { port: Number(JSON.stringify(process.env.VITE_APP_PORT)), host: JSON.stringify(process.env.VITE_APP_HOST) },
  server: {
    port: Number(process.env.VITE_APP_PORT) || 3004,
    host: process.env.VITE_APP_HOST || "localhost"
  },
  preview: {
    port: Number(process.env.VITE_APP_PORT) || 3005,
    host: process.env.VITE_APP_HOST || "localhost"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhc3VzXFxcXERlc2t0b3BcXFxcZSBjb21tZXJjZVxcXFxBZG1pbi1QYW5lbC1NYXRlcmlhbC1VSS1EZXNpZ25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFzdXNcXFxcRGVza3RvcFxcXFxlIGNvbW1lcmNlXFxcXEFkbWluLVBhbmVsLU1hdGVyaWFsLVVJLURlc2lnblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYXN1cy9EZXNrdG9wL2UlMjBjb21tZXJjZS9BZG1pbi1QYW5lbC1NYXRlcmlhbC1VSS1EZXNpZ24vdml0ZS5jb25maWcudHNcIjsvLyBpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuLy8gaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XHJcbi8vIGltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG4vLyBpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuXHJcbi8vIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIGNvbnN0IFBPUlQgPSAzMDM5O1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuLy8gICBwbHVnaW5zOiBbXHJcbi8vICAgICByZWFjdCgpLFxyXG4vLyAgICAgY2hlY2tlcih7XHJcbi8vICAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXHJcbi8vICAgICAgIGVzbGludDoge1xyXG4vLyAgICAgICAgIGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi9zcmMvKiovKi57anMsanN4LHRzLHRzeH1cIicsXHJcbi8vICAgICAgICAgZGV2OiB7IGxvZ0xldmVsOiBbJ2Vycm9yJ10gfSxcclxuLy8gICAgICAgfSxcclxuLy8gICAgICAgb3ZlcmxheToge1xyXG4vLyAgICAgICAgIHBvc2l0aW9uOiAndGwnLFxyXG4vLyAgICAgICAgIGluaXRpYWxJc09wZW46IGZhbHNlLFxyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgfSksXHJcbi8vICAgXSxcclxuLy8gICByZXNvbHZlOiB7XHJcbi8vICAgICBhbGlhczogW1xyXG4vLyAgICAgICB7XHJcblxyXG4vLyAgICAgICAgICdAbXVpL21hdGVyaWFsJzogJ0BtdWkvbWF0ZXJpYWwnLFxyXG4vLyAgICAgICAgICdAbXVpL2ljb25zLW1hdGVyaWFsJzogJ0BtdWkvaWNvbnMtbWF0ZXJpYWwnLFxyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgICB7XHJcbi8vICAgICAgICAgZmluZDogL15+KC4rKS8sXHJcbi8vICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnbm9kZV9tb2R1bGVzLyQxJyksXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICAgIHtcclxuLy8gICAgICAgICBmaW5kOiAvXnNyYyguKykvLFxyXG4vLyAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy8kMScpLFxyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgXSxcclxuLy8gICB9LFxyXG4vLyAgIHNlcnZlcjogeyBwb3J0OiBQT1JULCBob3N0OiB0cnVlIH0sXHJcbi8vICAgcHJldmlldzogeyBwb3J0OiBQT1JULCBob3N0OiB0cnVlIH0sXHJcbi8vIH0pO1xyXG5cclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcblxyXG4vLyBjb25zdCBQT1JUID0gMzAzOTtcclxuY29uc29sZS5sb2coJ1ZJVEVfQVBQX1BPUlQ6JywgcHJvY2Vzcy5lbnYuVklURV9BUFBfUE9SVCk7XHJcbmNvbnNvbGUubG9nKCdWSVRFX0FQUF9IT1NUOicsIHByb2Nlc3MuZW52LlZJVEVfQVBQX0hPU1QpO1xyXG5jb25zb2xlLmxvZygnYXBwIHVybCAgLCAnLCBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5WSVRFX0FQUF9CQVNFX1VSTCkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBkZWZpbmU6IHtcclxuICAgICdpbXBvcnQubWV0YS5lbnYuQkFTRV9VUkwnOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5WSVRFX0FQUF9CQVNFX1VSTClcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjaGVja2VyKHtcclxuICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcclxuXHJcbiAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICBwb3NpdGlvbjogJ3RsJyxcclxuICAgICAgICBpbml0aWFsSXNPcGVuOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAvXn4oLispLyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdub2RlX21vZHVsZXMvJDEnKSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6IC9ec3JjKC4rKS8sXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnc3JjLyQxJyksXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgLy8gc2VydmVyOiB7IHBvcnQ6IE51bWJlcihKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5WSVRFX0FQUF9QT1JUKSksIGhvc3Q6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LlZJVEVfQVBQX0hPU1QpIH0sXHJcbiAgLy8gcHJldmlldzogeyBwb3J0OiBOdW1iZXIoSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuVklURV9BUFBfUE9SVCkpLCBob3N0OiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5WSVRFX0FQUF9IT1NUKSB9LFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5WSVRFX0FQUF9QT1JUKSB8fCAzMDA0LFxyXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuVklURV9BUFBfSE9TVCB8fCAnbG9jYWxob3N0J1xyXG4gIH0sXHJcbiAgcHJldmlldzoge1xyXG4gICAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LlZJVEVfQVBQX1BPUlQpIHx8IDMwMDUsXHJcbiAgICBob3N0OiBwcm9jZXNzLmVudi5WSVRFX0FQUF9IT1NUIHx8ICdsb2NhbGhvc3QnXHJcbiAgfSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQTZDQSxPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUdsQixRQUFRLElBQUksa0JBQWtCLFFBQVEsSUFBSSxhQUFhO0FBQ3ZELFFBQVEsSUFBSSxrQkFBa0IsUUFBUSxJQUFJLGFBQWE7QUFDdkQsUUFBUSxJQUFJLGVBQWUsS0FBSyxVQUFVLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQztBQUV4RSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTiw0QkFBNEIsS0FBSyxVQUFVLFFBQVEsSUFBSSxpQkFBaUI7QUFBQSxFQUMxRTtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BRVosU0FBUztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BRUw7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLGlCQUFpQjtBQUFBLE1BQ3pEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsUUFBUTtBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUEsRUFJQSxRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLGFBQWEsS0FBSztBQUFBLElBQzNDLE1BQU0sUUFBUSxJQUFJLGlCQUFpQjtBQUFBLEVBQ3JDO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNLE9BQU8sUUFBUSxJQUFJLGFBQWEsS0FBSztBQUFBLElBQzNDLE1BQU0sUUFBUSxJQUFJLGlCQUFpQjtBQUFBLEVBQ3JDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
