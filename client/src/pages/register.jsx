import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Register() {
  const [location, setLocation] = useLocation();
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    managerCode: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsPending(true);
    // Validation: managerCode is required
    if (!form.managerCode) {
      setError("Manager code is required for manager registration.");
      setIsPending(false);
      return;
    }
    // TODO: Call API to register
    setTimeout(() => {
      setSuccess("Registration successful! Please login.");
      setIsPending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
            <i className="fas fa-user-plus text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Manager Registration</h2>
          <p className="mt-2 text-sm text-gray-600">Only managers can register an account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Fill in the details to register as a manager</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" value={form.username} onChange={handleChange("username")} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={form.password} onChange={handleChange("password")} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" type="text" value={form.fullName} onChange={handleChange("fullName")} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={handleChange("email")} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="managerCode">Manager Code</Label>
                  <Input id="managerCode" type="text" value={form.managerCode} onChange={handleChange("managerCode")} required className="mt-1" />
                  <p className="text-xs text-gray-500 mt-1">A valid manager code is required to register.</p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing up...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>
                    Register
                  </>
                )}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Button variant="link" type="button" onClick={() => setLocation("/login")}>Already have an account? Login</Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-center">
          <p className="text-xs text-gray-500">Arnifi Face Recognition Attendance System</p>
        </div>
      </div>
    </div>
  );
}
