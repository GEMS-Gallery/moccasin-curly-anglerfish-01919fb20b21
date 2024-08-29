import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor {
  // Define the TaxPayer type
  type TaxPayer = {
    tid: Nat;
    firstName: Text;
    lastName: Text;
    address: ?Text;
  };

  // Stable variable to store TaxPayer records
  stable var taxPayerEntries : [(Nat, TaxPayer)] = [];

  // Mutable variable to keep track of the number of records
  var taxPayerCount : Nat = 0;

  // Create a HashMap to store TaxPayer records
  let taxPayers = HashMap.HashMap<Nat, TaxPayer>(0, Nat.equal, Nat.hash);

  // Initialize the HashMap with stable data
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    for ((k, v) in taxPayerEntries.vals()) {
      taxPayers.put(k, v);
    };
    taxPayerCount := taxPayerEntries.size();
  };

  // Create a new TaxPayer record
  public func createTaxPayer(firstName: Text, lastName: Text, address: ?Text) : async Result.Result<Nat, Text> {
    taxPayerCount += 1;
    let newTaxPayer : TaxPayer = {
      tid = taxPayerCount;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(taxPayerCount, newTaxPayer);
    #ok(taxPayerCount)
  };

  // Get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Get a TaxPayer by TID
  public query func getTaxPayerByTID(tid: Nat) : async ?TaxPayer {
    taxPayers.get(tid)
  };

  // Update a TaxPayer record
  public func updateTaxPayer(tid: Nat, firstName: Text, lastName: Text, address: ?Text) : async Result.Result<(), Text> {
    switch (taxPayers.get(tid)) {
      case (null) {
        #err("TaxPayer not found")
      };
      case (?existingTaxPayer) {
        let updatedTaxPayer : TaxPayer = {
          tid = tid;
          firstName = firstName;
          lastName = lastName;
          address = address;
        };
        taxPayers.put(tid, updatedTaxPayer);
        #ok()
      };
    }
  };

  // Delete a TaxPayer record
  public func deleteTaxPayer(tid: Nat) : async Result.Result<(), Text> {
    switch (taxPayers.remove(tid)) {
      case (null) {
        #err("TaxPayer not found")
      };
      case (?_) {
        #ok()
      };
    }
  };
}
