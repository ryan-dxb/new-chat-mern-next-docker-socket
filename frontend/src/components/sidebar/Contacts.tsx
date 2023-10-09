import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ContactsProps {}

const Contacts: NextPage<ContactsProps> = () => {
  const groupWith = (fn: Function, list: string[]) =>
    list
      .slice(1)
      .reduce(
        (all, curr) =>
          fn(all[all.length - 1][0], curr)
            ? all.slice(0, -1).concat([all[all.length - 1].concat(curr)])
            : all.concat([[curr]]),
        [[list[0]]]
      );

  const names = [
    "Brian Adams",
    "Anders Sandberg",
    "Angela Merkel",
    "Carl Bildt",
    "Anton Lundin Pettersson",
    "Bernard Sanders",
    "Sam Smith",
    "Zino Zetterberg",
    "Zlatan Ibrahimovic",
    "Zara Larsson",
    "Karl Karlsson",
    "Kalle Karlsson",
  ];

  const groups = groupWith(
    (a: any, b: any) => a.charAt(0) == b.charAt(0),
    names.sort()
  );

  // Get the letter of the first name in each group
  const letters = groups.map((group) => group[0].charAt(0));

  // Create a new array with the letter and the group as an object
  const GroupedNamesWithLetter = letters.map((letter, index) => {
    return {
      letter,
      group: groups[index],
    };
  });
  return (
    <SidebarWrapper>
      <SidebarHeader header="Contacts" />
      <SidebarSearch />
      {/* Chat List */}

      {/* Contact List with Grouped by Name */}
      <div className="flex flex-col mt-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
        {GroupedNamesWithLetter.map((group) => (
          <div key={group.letter}>
            <h1 className="text-xl font-semibold">{group.letter}</h1>
            <div className="flex flex-col mt-4 space-y-2 ">
              {group.group.map((name, i) => (
                <div key={i + name} className="flex items-center space-x-2">
                  <Avatar className="w-10 h-10 ">
                    <AvatarFallback className="bg-primary/5">
                      {name.split(" ").map((name) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold">{name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default Contacts;
