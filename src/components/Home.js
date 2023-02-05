import Graph from "./Graph";
import Form from "./Form";

export default function Home() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-80">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
          Expense Tracker
        </h1>

        {/* { grid columns } */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* { chart } */}
          <Graph></Graph>
          {/* {form} */}
          <Form></Form>
        </div>
      </div>
    </div>
  );
}

// import Graph from "./Graph";
// import Form from "./Form";

// import { useNavigate, Link } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";

// const Home = () => {
//   const { setAuth } = useContext(AuthContext);

//   const logout = async () => {
//     // if used in more components, this should be in context
//     // axios to /logout endpoint
//     setAuth({});
//   };

//   return (
//     <div className="App">
//       <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-80">
//         <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
//           Expense Tracker
//         </h1>

//         {/* { grid columns } */}
//         <div className="grid md:grid-cols-2 gap-4">
//           {/* { chart } */}
//           <Graph></Graph>
//           {/* {form} */}
//           <Form></Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
