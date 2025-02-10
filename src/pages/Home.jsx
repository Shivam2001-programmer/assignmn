import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          localStorage.removeItem("token");

          Swal.fire(
            "Logged Out!",
            "You have been logged out successfully.",
            "success"
          );

          navigate("/login");
        } catch (error) {
          console.error("Logout Error:", error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445] text-white">
      <nav className="flex justify-between items-center p-4 bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445]">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <div className="hidden md:flex gap-4"></div>
        <div className="flex items-center gap-4">
          <button
            className="hidden md:block bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445] p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-400"
            }
          >
            Home
          </NavLink>
        </div>
      )}

      <div className="bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445] text-white">
        <header className="flex flex-col items-center justify-center text-center py-20 px-4">
          <h2 className="text-4xl md:text-6xl font-bold">Welcome to Infloso</h2>
          <p className="mt-4 text-lg md:text-xl text-gray-400">Metaverse</p>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Get Started
            </button>
            <button className="border border-white px-4 py-2 rounded">
              Learn More
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 ">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">Feature 1</div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">Feature 2</div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">Feature 3</div>
        </section>
        <section className="p-8 bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445]">
          <h2 className="text-3xl font-bold text-center mb-6">
            Introducing Blogchain
          </h2>
          <p className="text-lg text-gray-300 text-center mb-4">
            Blogchain is a revolutionary blogging platform that leverages
            blockchain technology to ensure transparency, security, and
            ownership of content. With Blogchain, writers can publish their work
            without fear of censorship or theft.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Decentralized Ownership
              </h3>
              <p className="text-gray-400">
                Every post is stored on the blockchain, giving authors complete
                ownership and control over their content.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Monetization Opportunities
              </h3>
              <p className="text-gray-400">
                Writers can earn cryptocurrency through tips, subscriptions, and
                ad revenue, creating a sustainable income stream.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Community Engagement
              </h3>
              <p className="text-gray-400">
                Engage with your audience directly through comments and
                feedback, fostering a vibrant community around your content.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Immutable Records</h3>
              <p className="text-gray-400">
                All posts and interactions are recorded on the blockchain,
                ensuring authenticity and preventing content manipulation.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Start Blogging on Blogchain
            </button>
          </div>
        </section>
      </div>

      <footer className="text-center mt-24 py-6 bg-gradient-to-br from-[#0c1445] via-[#1b3f7c] to-[#0c1445]">
        <p>&copy; 2025 Brand. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
