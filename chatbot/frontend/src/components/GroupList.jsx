import PropTypes from 'prop-types';

export default function GroupList({ groups, currentGroup, onSelectGroup }) {
  return (
    <div className="space-y-2">
      {groups.map(group => (
        <div
          key={group._id}
          className={`p-3 rounded cursor-pointer ${
            currentGroup?._id === group._id
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-200'
          }`}
          onClick={() => onSelectGroup(group)}
        >
          <h3 className="font-medium">{group.name}</h3>
          <p className="text-sm">
            {group.members.length} members
          </p>
        </div>
      ))}
    </div>
  );
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  currentGroup: PropTypes.object,
  onSelectGroup: PropTypes.func.isRequired
}; 